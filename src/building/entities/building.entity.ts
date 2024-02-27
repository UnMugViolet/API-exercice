import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { AddressEntity } from 'src/address/entities/address.entity';
import { CommonFacilityToBuildingEntity } from 'src/common-facility-to-building/entities/common-facility-to-building.entity';

@Entity('building')
export class BuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  buildingCreationDate: Date;

  @OneToOne(() => AddressEntity, address => address.building)
  address: AddressEntity;

  @OneToMany(() => ApartmentEntity, apartment => apartment.building)
  apartments: ApartmentEntity[];

  @OneToMany(() => CommonFacilityToBuildingEntity, commonFacilityToBuilding => commonFacilityToBuilding.commonFacility)
  commonFacilityToBuilding: CommonFacilityToBuildingEntity[];
}