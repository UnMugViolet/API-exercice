import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { BuildingEntity } from '../../building/entities/building.entity';

@Entity('common_facility')
export class CommonFacilityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  lastInspection: Date;

  @ManyToMany(() => BuildingEntity, building => building.commonFacilities)
  buildings: BuildingEntity[];
}