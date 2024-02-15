import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Building } from './building.entity';

@Entity('common_facility')
export class CommonFacility {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastInspection: Date;

  @ManyToMany(() => Building, building => building.commonFacilities)
  buildings: Building[];
}