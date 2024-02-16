import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { PersonEntity } from '../../person/entities/person.entity';

@Entity('owner')
export class OwnerEntity extends PersonEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankAccountNumber: string;'class-validator'

  @Column()
  isVATpayer: boolean;

  @OneToMany(() => ApartmentEntity, apartment => apartment.owner)
  apartments: ApartmentEntity[];
}