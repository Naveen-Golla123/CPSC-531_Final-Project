import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { highest_number_of_4and6s } from './Entities/SixesAndFours';
import { Client } from "pg"

@Injectable()
export class AppService {

  public client = new Client({
    host: '<hostname>',
    user: '<user_name>',
    password: '<password>',
    database: '<database>'
  });

  constructor()  {
    console.log(this.client)
    this.client.connect()
    .then(() => {
      console.log('Connected to database!');
    })
    .catch(err => {
      console.error('Error connecting to database', err);
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
  
  async getRunsVsWickets(){
    let result = await this.client.query('SELECT * FROM "public"."inningsWin_df" LIMIT 100')
    return result.rows;
  }

  async getExtraruns(){
    let result = await this.client.query('SELECT * FROM "public"."ExtraRuns" LIMIT 100')
    return result.rows;
  }

  async getline_graph_scores(){
    let result = await this.client.query('SELECT * FROM "public"."line_graph_scores" LIMIT 100')
    return result.rows;
  }

  async getHighestNumber_of_4s_6s(){
    let result = await this.client.query('SELECT * FROM "public"."highest_Number_of_4and6s" LIMIT 100')
    return result.rows;
  }


}
