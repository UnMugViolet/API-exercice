import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Apartment } from './apartment.entity';

@Entity('owner')
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Apartment, apartment => apartment.owner)
  apartments: Apartment[];
}