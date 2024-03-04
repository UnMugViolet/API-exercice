import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BuildingEntity } from "../../building/entities/building.entity";
import { CommonFacilityEntity } from "../../common-facility/entities/common-facility.entity";

@Entity('common_facility_to_building')
export class CommonFacilityToBuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  lastInspection: Date;

  @ManyToOne(() => CommonFacilityEntity, commonFacility => commonFacility.commonFacilityToBuilding, { onDelete: 'SET NULL' })
  commonFacility: CommonFacilityEntity;

  @ManyToOne(() => BuildingEntity, building => building.commonFacilityToBuilding , { onDelete: 'SET NULL'})
  building: BuildingEntity;
}
