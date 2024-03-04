import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';
import { PersonEntity } from '../../person/entities/person.entity';

@Entity('tenant')
export class TenantEntity extends PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isMainTenant: boolean;

  @ManyToOne(() => ApartmentEntity, apartment => apartment.tenants, { onDelete: 'SET NULL' })
  apartment: ApartmentEntity;
}