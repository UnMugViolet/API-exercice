import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { BuildingEntity } from '../../building/entities/building.entity';
import { CommonFacilityToBuildingEntity } from '../../common-facility-to-building/entities/common-facility-to-building.entity';

@Entity('common_facility')
export class CommonFacilityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isSecure: boolean

  @OneToMany(() => CommonFacilityToBuildingEntity, commonFacilityToBuilding => commonFacilityToBuilding.commonFacility)
  commonFacilityToBuilding: CommonFacilityToBuildingEntity[];
}