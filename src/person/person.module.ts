import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService],
})
export class PersonModule {}
