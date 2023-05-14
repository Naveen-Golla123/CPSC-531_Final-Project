from pyspark.sql.functions import *
from pyspark.sql.functions import count, avg
from pyspark.sql.functions import col
# import matplotlib.pyplot as plt
import seaborn as sns
# import numpy as np
from pyspark.sql import SparkSession
import paramiko
import pandas as pd
import psycopg2
from sqlalchemy import create_engine


# Database configuration
postgresql_host_name = "<hostname>"
postgresql_port_no = "<port>"
postgresql_user_name = "<user_name>"
postgresql_password = "<databaseconnection_password>"
postgresql_database_name = "<database_name>"
postgresql_driver = "<driver>"

db_properties = {'user': postgresql_user_name, 'password': postgresql_password, 'driver': postgresql_driver}

# Spark config Constants
SPARK_APP_NAME = "Server data analysis"
sns.set()


# Connect to the PostgreSQL database
conn = psycopg2.connect(
    host=postgresql_host_name,
    database=postgresql_database_name,
    user=postgresql_user_name,
    password=postgresql_password
)

def save_dataframe_to_sql(current_df, postgresql_table_name):

    pandas_df = current_df.toPandas()
    engine = create_engine('postgresql+psycopg2://<username>:<password>@<hostname>/<database_name>')
    pandas_df.to_sql(postgresql_table_name, engine, if_exists='replace', index=False)


if __name__ == "__main__":
    # Start Spark Session
    spark = SparkSession.builder.appName(SPARK_APP_NAME).getOrCreate()

    matches_df = spark.read.format("csv").option("header", "true").load("s3://cpsc-531-input-bucket/input_folder/IPL_Matches_2008_2020.csv")
    ball_to_ball_df = spark.read.format("csv").option("header", "true").load("s3://cpsc-531-input-bucket/input_folder/IPL_Ball_by_Ball_2008_2020.csv")

    # Merging two datasets
    merged_df = matches_df.join(ball_to_ball_df, "id")
    merged_df.show()

    # Generating year column
    merged_df = merged_df.withColumn("Year", substring(col("Date"), 0, 4))
    merged_df = merged_df.sort("Year")
    merged_df.show()
    
    # DATA CLEANING - Replace deccan Chargers with Sun Risers
    replaceCol_df = merged_df
    for column in ["batting_team", "bowling_team", "team1", "team2", "toss_winner", "winner"]:
        replaceCol_df = replaceCol_df.withColumn(column,
                                                 when(col(column) == "Deccan Chargers",
                                                      "Sunrisers Hyderabad").otherwise(
                                                     col(column)))
        replaceCol_df = replaceCol_df.withColumn(column,
                                                 when(col(column) == "Delhi Daredevils",
                                                      "Delhi Capitals").otherwise(
                                                     col(column)))
        replaceCol_df = replaceCol_df.withColumn(column,
                                                 when(col(column) == "Rising Pune Supergiant",
                                                      "Rising Pune Supergiants").otherwise(
                                                     col(column)))
    cleaned_df = replaceCol_df


    '''
        Players who made highest number of Sixes and fours.
    '''
    highest_Number_of_4and6s = merged_df.groupBy("batsman").agg(
        count(when(col("batsman_runs") == 4, True)).alias("Number_of_Fours"),
        count(when(col("batsman_runs") == 6, True)).alias("Number_of_Sixes"),
        last("batting_team").alias("Most_recent_team"))
    highest_Number_of_4and6s = highest_Number_of_4and6s.withColumn("Total_Boundaries",
                                                                   col("Number_of_Fours") + col("Number_of_Sixes"))
    highest_Number_of_4and6s = highest_Number_of_4and6s.sort('Total_Boundaries', ascending=False)
    highest_Number_of_4and6s = highest_Number_of_4and6s.limit(20)
    save_dataframe_to_sql(highest_Number_of_4and6s,"highest_Number_of_4and6s")
    
    extra_runs_df = cleaned_df.groupBy("extras_type").agg(sum("extra_runs").alias("Extra_Runs"))
    extra_runs_df = extra_runs_df.filter(col("extras_type") != "NA")
    save_dataframe_to_sql(extra_runs_df,"ExtraRuns")
    extra_runs_df.show()
    
    extra_runs_pandas_df = extra_runs_df.toPandas()

    '''
        Team wins in chasing/Defending.
    '''
    inningsWin_df = cleaned_df.groupBy("id", "winner", "result").agg(count("*").alias("Dummy"))
    inningsWin_df = inningsWin_df.groupBy("winner", "result").agg(count("*").alias("Matchs_win_count"))
    inningsWin_df = inningsWin_df.filter((col("result") != "tie") & (col("result") != "NA"))
    pivoted_innings_df = inningsWin_df.groupBy("winner").pivot("result").sum("Matchs_win_count")
    save_dataframe_to_sql(pivoted_innings_df, "inningsWin_df")
    pdf = pivoted_innings_df.toPandas()
    
    '''
        Year vs Player( or team ) and count line graph // Too many lines
    '''
    line_graph_scores = cleaned_df.groupBy("year", "batting_team").agg(sum("total_runs").alias("Total_Runs"))
    pivoted_df = line_graph_scores.groupBy("year").pivot("batting_team").sum("Total_Runs")
    
    pivoted_df = pivoted_df.drop('Gujarat Lions', 'Kochi Tuskers Kerala', 'Pune Warriors', 'Rising Pune Supergiant',
                                 'Rajasthan Royals', 'Rising Pune Supergiant', 'Rising Pune Supergiants')
    # pivoted_df.show()
    save_dataframe_to_sql(pivoted_df, "line_graph_scores")
    
    pandas_df = pivoted_df.toPandas()
    x_column = 'year'
    y_columns = ['Chennai Super Kings', 'Delhi Capitals', 'Kings XI Punjab', 'Kolkata Knight Riders', 'Mumbai Indians',
                 'Royal Challengers Bangalore', 'Sunrisers Hyderabad']
    
    # Define colors and line styles for each series
    colors = ['blue', 'red', 'green']
    linestyles = ['-', '--', ':']
    
    
    '''
        Population Pyramid reference -> https://datavizcatalogue.com/methods/population_pyramid.html
    '''
    cleaned_df = cleaned_df.withColumn("over", col('over').cast('integer'))
    score_per_over_df = cleaned_df.groupBy("id", "inning", "over", "batting_team").agg(
        sum("total_runs").alias("runs_per_over"))
    over_range_innings = score_per_over_df.withColumn("over",
                                                      when(col("over") <= 5, "Batting PowerPlay 1").when(
                                                          col("over") >= 16,
                                                          "Batting Powerplay 2").otherwise(
                                                          "Bowling Powerplay")).alias("Overs Range")
    
    over_range_innings = over_range_innings.groupBy("batting_team", "over").agg(avg("runs_per_over").alias("Avg_Runs"))
    
    # Rename team names to acronym
    over_range_innings = over_range_innings.withColumn("batting_team",
                                                       when(col("batting_team") == "Sunrisers Hyderabad", "SRH").
                                                       when(col("batting_team") == "Chennai Super Kings", "CSK").
                                                       when(col("batting_team") == "Kochi Tuskers Kerala", "KTK").
                                                       when(col("batting_team") == "Rajasthan Royals", "RR").
                                                       when(col("batting_team") == "Gujarat Lions", "GL").
                                                       when(col("batting_team") == "Kings XI Punjab", "KXIP").
                                                       when(col("batting_team") == "Pune Warriors", "PW").
                                                       when(col("batting_team") == "Delhi Capitals", "DC").
                                                       when(col("batting_team") == "Mumbai Indians", "MI").
                                                       when(col("batting_team") == "Kolkata Knight Riders", "KKR").
                                                       when(col("batting_team") == "Royal Challengers Bangalore",
                                                            "RCB").
                                                       when(col("batting_team") == "Rising Pune Supergiants", "RPS"))
    
    save_dataframe_to_sql(over_range_innings,"over_range_innings")
    
    over_range_innings = over_range_innings.groupBy("batting_team").pivot("over").sum("Avg_Runs")
    over_range_innings_df = over_range_innings.toPandas()
    '''
    
    '''
    
    conn.close()
    spark.stop()
