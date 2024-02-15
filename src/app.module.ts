import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { Building } from './entities/building.entity';
import { CommonFacility } from './entities/common-facility.entity';
import { Apartment } from './entities/apartment.entity';
import { Owner } from './entities/owner.entity';
import { Option } from './entities/option.entity';
import { Tenant } from './entities/tenant.entity';

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
        Building, 
        CommonFacility, 
        Apartment, 
        Owner, 
        Option, 
        Tenant
      ],
      synchronize: true,
    }),
  ],
})
export class AppModule {}