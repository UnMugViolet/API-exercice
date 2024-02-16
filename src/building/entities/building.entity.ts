import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, OneToOne } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { CommonFacilityEntity } from '../../common-facility/entities/common-facility.entity';
import { AddressEntity } from 'src/address/entities/address.entity';

@Entity('building')
export class BuildingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @OneToOne(() => AddressEntity, address => address.building)
  address: AddressEntity;

  @OneToMany(() => ApartmentEntity, apartment => apartment.building)
  apartments: ApartmentEntity[];

  @ManyToMany(() => CommonFacilityEntity)
  @JoinTable()
  commonFacilities: CommonFacilityEntity[];
}