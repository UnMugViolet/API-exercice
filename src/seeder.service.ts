import { Injectable } from '@nestjs/common';
import { CreateApartmentTypeDto } from './apartment-type/dto/create-apartment-type.dto';
import { ApartmentTypeService } from './apartment-type/apartment-type.service';
import { CommonFacilityService } from './common-facility/common-facility.service';
import { CreateCommonFacilityDto } from './common-facility/dto/create-common-facility.dto';
import { AddressService } from './address/address.service';
import { CreateAddressDto } from './address/dto/create-address.dto';

@Injectable()
export class SeederService {
  constructor(
    private readonly apartmentTypeService: ApartmentTypeService,
    private readonly commonFacilityService: CommonFacilityService,
    private readonly addressService: AddressService,
  ) {}

  async seedApartmentTypes() {
    const apartmentTypes = [
      { type: 'T1', maxOccupancy: 2 },
      { type: 'T2', maxOccupancy: 4 },
      { type: 'T3', maxOccupancy: 6 },
      { type: 'T4', maxOccupancy: 8 },
    ];

    for (const apartmentType of apartmentTypes) {
      // Check if the apartment type already exists
      const existingApartmentType = await this.apartmentTypeService.findOneByName(apartmentType.type);

      if (!existingApartmentType) {
        const createApartmentTypeDto = new CreateApartmentTypeDto();
        createApartmentTypeDto.type = apartmentType.type;
        createApartmentTypeDto.maxOccupancy = apartmentType.maxOccupancy;
        await this.apartmentTypeService.create(createApartmentTypeDto);
      }
    }
  }

  async seedCommonFacilities() {
    const commonFacilities = [
      { name: 'Gym', lastInspection: new Date() },
      { name: 'Swimming Pool', lastInspection: new Date() },
      { name: 'Sauna', lastInspection: new Date() },
      { name: 'Basketball Court', lastInspection: new Date() },
      { name: 'Elevator', lastInspection: new Date()},
    ];

    for (const commonFacility of commonFacilities) {
      // Check if the common facility already exists
      const existingCommonFacility = await this.commonFacilityService.findOneByName(commonFacility.name);
      if (!existingCommonFacility) {
        const createCommonFacilityDto = new CreateCommonFacilityDto();
        createCommonFacilityDto.name = commonFacility.name;
        createCommonFacilityDto.lastInspection = commonFacility.lastInspection;
        await this.commonFacilityService.create(createCommonFacilityDto);
      }
    }
  }

  async seedAdresses() {
    const addresses = [
      { streetNumber: 123, label: null, streetName: 'Main', city: 'New York', zipCode: '10001' },
      { streetNumber: 456, label: null, streetName: 'Pennsylvania', city: 'Washington', zipCode: '20004' },
    ];
    
    for(const address of addresses) {
      // Check if the address already exists
      const existingAddress = await this.addressService.findOneByStreetNumberAndStreetName(address.streetNumber, address.streetName);
      if (!existingAddress) {
        const createAddressDto = new CreateAddressDto();
        createAddressDto.streetNumber = address.streetNumber;
        createAddressDto.label = address.label;
        createAddressDto.streetName = address.streetName;
        createAddressDto.city = address.city;
        createAddressDto.zipCode = address.zipCode;
        await this.addressService.create(createAddressDto);
      }
    }
  }

  async seedAll() {
    await this.seedApartmentTypes();
    await this.seedCommonFacilities();
    await this.seedAdresses();
  }
}