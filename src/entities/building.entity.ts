import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Apartment } from './apartment.entity';
import { CommonFacility } from './common-facility.entity';

@Entity('building')
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToMany(() => Apartment, apartment => apartment.building)
  apartments: Apartment[];

  @ManyToMany(() => CommonFacility)
  @JoinTable()
  commonFacilities: CommonFacility[];
}