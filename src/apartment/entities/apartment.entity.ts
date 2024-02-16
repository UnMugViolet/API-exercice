import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { BuildingEntity } from '../../building/entities/building.entity';
import { OptionEntity } from '../../option/entities/option.entity';
import { TenantEntity } from '../../tenant/entities/tenant.entity';
import { OwnerEntity } from '../../owner/entities/owner.entity';

@Entity('apartment')
export class ApartmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => BuildingEntity, building => building.apartments)
  building: BuildingEntity;

  @ManyToOne(() => OwnerEntity, owner => owner.apartments)
  owner: OwnerEntity;

  @ManyToMany(() => OptionEntity)
  @JoinTable()
  options: OptionEntity[];

  @OneToMany(() => TenantEntity, tenant => tenant.apartment)
  tenants: TenantEntity[];
}