import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApartmentEntity } from '../../apartment/entities/apartment.entity';

@Entity('tenant')
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => ApartmentEntity, apartment => apartment.tenants)
  apartment: ApartmentEntity;
}