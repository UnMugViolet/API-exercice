import { PartialType } from '@nestjs/swagger';
import { CreateCommonFacilityToBuildingDto } from './create-common-facility-to-building.dto';

export class UpdateCommonFacilityToBuildingDto extends PartialType(CreateCommonFacilityToBuildingDto) {}
