import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentService } from './apartment.service';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentController } from './apartment.controller';
import { ApartmentTypeEntity } from 'src/apartment-type/entities/apartment-type.entity';
import { OwnerEntity } from 'src/owner/entities/owner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentEntity, ApartmentTypeEntity, OwnerEntity])],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService]
})
export class ApartmentModule {}