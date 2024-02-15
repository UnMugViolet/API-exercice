import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('real_estate')
export class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Add more columns as needed
}