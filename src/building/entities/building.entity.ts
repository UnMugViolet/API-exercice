import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { CommonFacilityEntity } from '../../common-facility/entities/common-facility.entity';
import { AddressEntity } from 'src/address/entities/address.entity';
import { CommonFacilityToBuilding } from 'src/common-facility-to-building/entities/common-facility-to-building.entity';

@Entity('building')
export class BuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  buildingDate: Date;

  @OneToOne(() => AddressEntity, address => address.building)
  address: AddressEntity;

  @OneToMany(() => ApartmentEntity, apartment => apartment.building)
  apartments: ApartmentEntity[];

  @OneToMany(() => CommonFacilityToBuilding, commonFacilityToBuilding => commonFacilityToBuilding.commonFacility)
  commonFacilityToBuilding: CommonFacilityToBuilding[];
}