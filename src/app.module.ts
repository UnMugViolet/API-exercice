import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { ApartmentEntity } from './apartment/entities/apartment.entity';
import { BuildingEntity } from './building/entities/building.entity';
import { CommonFacilityEntity } from './common-facility/entities/common-facility.entity';
import { OptionEntity } from './option/entities/option.entity';
import { OwnerEntity } from './owner/entities/owner.entity';
import { TenantEntity } from './tenant/entities/tenant.entity';
import { AddressModule } from './address/address.module';
import { ApartmentModule } from './apartment/apartment.module';
import { BuildingModule } from './building/building.module';
import { CommonFacilityModule } from './common-facility/common-facility.module';
import { OptionModule } from './option/option.module';
import { OwnerModule } from './owner/owner.module';
import { AddressEntity } from './address/entities/address.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        AddressEntity,
        BuildingEntity, 
        CommonFacilityEntity, 
        ApartmentEntity, 
        OwnerEntity, 
        OptionEntity, 
        TenantEntity
      ],
      synchronize: true,
    }),
    AddressModule,
    ApartmentModule,
    BuildingModule,
    CommonFacilityModule,
    OptionModule,
    OwnerModule,
  ],
})
export class AppModule {}