import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionEntity } from './entities/option.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  providers: [OptionService],
  controllers: [OptionController],
  exports: [OptionService]
})
export class OptionModule {}
