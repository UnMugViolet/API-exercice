import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Building } from './building.entity';
import { Option } from './option.entity';
import { Tenant } from './tenant.entity';
import { Owner } from './owner.entity';

@Entity('apartment')
export class Apartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => Building, building => building.apartments)
  building: Building;

  @ManyToOne(() => Owner, owner => owner.apartments)
  owner: Owner;

  @ManyToMany(() => Option)
  @JoinTable()
  options: Option[];

  @OneToMany(() => Tenant, tenant => tenant.apartment)
  tenants: Tenant[];
}