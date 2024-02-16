import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';

@Entity('owner')
export class OwnerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ApartmentEntity, apartment => apartment.owner)
  apartments: ApartmentEntity[];
}