import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';
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

  @OneToOne(() => AddressEntity, { eager: true , onDelete: 'SET NULL'})
  @JoinColumn()
  address: AddressEntity;

  @OneToMany(() => ApartmentEntity, apartment => apartment.building, { cascade: true, onDelete: 'CASCADE'})
  apartments: ApartmentEntity[];

  @OneToMany(() => CommonFacilityToBuildingEntity, commonFacilityToBuilding => commonFacilityToBuilding.commonFacility)
  commonFacilityToBuilding: CommonFacilityToBuildingEntity[];
}