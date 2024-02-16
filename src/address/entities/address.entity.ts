import { BuildingEntity } from "src/building/entities/building.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  streetNumber: string;

  @Column()
  streetName: string;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @OneToOne(() => BuildingEntity, building => building.address)
  building: BuildingEntity;
}
