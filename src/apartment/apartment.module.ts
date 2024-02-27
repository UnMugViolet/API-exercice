import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentService } from './apartment.service';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentController } from './apartment.controller';
import { ApartmentTypeEntity } from 'src/apartment-type/entities/apartment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentEntity, ApartmentTypeEntity])],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService]
})
export class ApartmentModule {}