import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BuildingEntity } from "../../building/entities/building.entity";
import { CommonFacilityEntity } from "../../common-facility/entities/common-facility.entity";

@Entity('common_facility_to_building')
export class CommonFacilityToBuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => CommonFacilityEntity, commonFacility => commonFacility.commonFacilityToBuilding)
  commonFacility: CommonFacilityEntity;

  @ManyToOne(() => BuildingEntity, building => building.commonFacilityToBuilding)
  building: BuildingEntity;
}
