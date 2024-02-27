import { Module } from '@nestjs/common';
import { ApartmentTypeService } from './apartment-type.service';
import { ApartmentTypeController } from './apartment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentTypeEntity } from './entities/apartment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentTypeEntity])],
  providers: [ApartmentTypeService],
  controllers: [ApartmentTypeController],
  exports: [ApartmentTypeService]
}) 
export class ApartmentTypeModule {}
