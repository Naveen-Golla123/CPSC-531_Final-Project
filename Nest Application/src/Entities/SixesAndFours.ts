import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class highest_number_of_4and6s {
  @PrimaryColumn()
  id: number;

  @Column({
    nullable:true
  })
  batsman: string;

  @Column({
    nullable:true
  })
  Number_of_Fours: number;

  @Column({
    nullable:true
  })
  Number_of_Sixes: number;

  @Column({
    nullable:true
  })
  Most_recent_team: string;

  @Column({
    nullable:true
  })
  Total_Boundaries: number;
}
