import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity('option')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Apartment, apartment => apartment.options)
  apartments: Apartment[];
}