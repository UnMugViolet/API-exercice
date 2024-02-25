import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentService } from './apartment.service';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentController } from './apartment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ApartmentEntity])],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [ApartmentService]
})
export class ApartmentModule {}