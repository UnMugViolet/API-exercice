import { ApartmentEntity } from "src/apartment/entities/apartment.entity";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("apartment_type")
export class ApartmentTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  maxOccupancy: number;

  @OneToMany(() => ApartmentEntity, apartment => apartment.apartmentType)
  apartments: ApartmentEntity[];

}
