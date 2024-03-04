import { Injectable } from '@nestjs/common';
import { CreateApartmentTypeDto } from './apartment-type/dto/create-apartment-type.dto';
import { ApartmentTypeService } from './apartment-type/apartment-type.service';
import { CommonFacilityService } from './common-facility/common-facility.service';
import { CreateCommonFacilityDto } from './common-facility/dto/create-common-facility.dto';
import { AddressService } from './address/address.service';
import { CreateAddressDto } from './address/dto/create-address.dto';
import { OptionService } from './option/option.service';
import { CreateOptionDto } from './option/dto/create-option.dto';
import { OwnerService } from './owner/owner.service';
import { CreateOwnerDto } from './owner/dto/create-owner.dto';
import { TenantService } from './tenant/tenant.service';
import { CreateTenantDto } from './tenant/dto/create-tenant.dto';
import { ApartmentService } from './apartment/apartment.service';
import { CreateApartmentDto } from './apartment/dto/create-apartment.dto';
import { BuildingService } from './building/building.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly apartmentTypeService: ApartmentTypeService,
    private readonly commonFacilityService: CommonFacilityService,
    private readonly addressService: AddressService,
    private readonly optionService: OptionService,
    private readonly ownerService: OwnerService,
    private readonly tenantService: TenantService,
    private readonly apartmentService: ApartmentService,
    private readonly buildingService: BuildingService,
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
      { name: 'Gym', lastInspection: new Date(), isSecure: true},
      { name: 'Swimming Pool', lastInspection: new Date(), isSecure: false },
      { name: 'Sauna', lastInspection: new Date(), isSecure: false },
      { name: 'Basketball Court', lastInspection: new Date(), isSecure: false },
      { name: 'Elevator', lastInspection: new Date(), isSecure: true},
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
      { streetNumber: 789, label: 'bis', streetName: 'Constitution', city: 'Philadelphia', zipCode: '19106' },
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

  async seedOptions() { 
    const options = [
      { name: 'Balcony', description: 'Balcony with a beautiful view' },
      { name: 'Air Conditioning', description: 'Air conditioning in the apartment' },
      { name: 'Pet Friendly', description: 'Pets are allowed in the apartment'},
    ];

    for(const option of options) {
      // Check if the option already exists
      const existingOption = await this.optionService.findOneByName(option.name);
      if (!existingOption) {
        const createOptionDto = new CreateOptionDto();
        createOptionDto.name = option.name;
        createOptionDto.description = option.description;
        await this.optionService.create(createOptionDto);
      }
    }
  }

  async seedOwners() {
    const owners = [
      { firstName: 'John', lastName: 'Doe', phoneNumber: '0618784005', bankAccountNumber: 'NL91ABNA0417164300', isVATpayer: false},
      { firstName: 'Jane', lastName: 'Doe', phoneNumber: '0618784005', bankAccountNumber: 'NL91ABNA4080414423', isVATpayer: true},
      { firstName: 'Jack', lastName: 'Doe', phoneNumber: '0618784005', bankAccountNumber: 'NL91ABNA7484514174', isVATpayer: true},
    ];

    for(const owner of owners) {
      // Check if the owner already exists
      const existingOwner = await this.ownerService.findOneByBankAccountNumber(owner.bankAccountNumber);
      if (!existingOwner) {
        const createOwnerDto = new CreateOwnerDto();
        createOwnerDto.firstName = owner.firstName;
        createOwnerDto.lastName = owner.lastName;
        createOwnerDto.phoneNumber = owner.phoneNumber;
        createOwnerDto.bankAccountNumber = owner.bankAccountNumber;
        createOwnerDto.isVATpayer = owner.isVATpayer;
        await this.ownerService.create(createOwnerDto);
      }
    }
  }

  async seedTenants() {
    const tenants = [ 
      { id: 1, firstName: "John", lastName: "Tenant", phoneNumber: "0618784001", isMainTenant: true },
      { id: 2, firstName: "Jane", lastName: "Tenant", phoneNumber: "0618784002", isMainTenant: false },
      { id: 3, firstName: "Jack", lastName: "Tenant", phoneNumber: "0618784003", isMainTenant: false },
    ];

    for(const tenant of tenants) {
      // Check if the tenant already exists
      const existingTenant = await this.tenantService.findOne(tenant.id);
      if (!existingTenant) {
        const createTenantDto = new CreateTenantDto();
        createTenantDto.firstName = tenant.firstName;
        createTenantDto.lastName = tenant.lastName;
        createTenantDto.phoneNumber = tenant.phoneNumber;
        createTenantDto.isMainTenant = tenant.isMainTenant;
        await this.tenantService.create(createTenantDto);
      }
    }
  }
  
  async seedApartments() {
    const apartments = [
      { description: 'Beautiful apartment with a view', doorNumber: '1A', floorArea: 1, rent: 750, apartmentType: 2 },
      { description: 'Beautiful apartment perfect for couple or man lownly', doorNumber: '1B', floorArea: 2, rent: 1800, apartmentType: 3  },
      { description: 'Beautiful apartment with a swimming pool', doorNumber: '1C', floorArea: 3, rent: 800, apartmentType: 1  },
    ];

    for(const apartment of apartments) {
      // Check if the apartment already exists
      const existingApartment = await this.apartmentService.findOneByDescription(apartment.description);
      if (!existingApartment) {
        const createApartmentDto = new CreateApartmentDto();
        createApartmentDto.description = apartment.description;
        createApartmentDto.doorNumber = apartment.doorNumber;
        createApartmentDto.floorArea = apartment.floorArea;
        createApartmentDto.rent = apartment.rent;
        createApartmentDto.apartmentType = apartment.apartmentType;
        await this.apartmentService.createApartmentWithType(createApartmentDto);
      }
    }
  }

  async seedBuildings() {
    const buildings = [
      { name: 'Empire State Building', buildingCreationDate: new Date() },
      { name: 'The White House', buildingCreationDate: new Date() },
      { name: 'The Liberty Bell', buildingCreationDate: new Date() },
    ];

    for(const building of buildings) {
      // Check if the building already exists
      const existingBuilding = await this.buildingService.findOneByName(building.name);
      if (!existingBuilding) {
        await this.buildingService.create(building);
      }
    }
  }

  async seedAll() {
    await this.seedApartmentTypes();
    await this.seedCommonFacilities();
    await this.seedAdresses();
    await this.seedOwners();
    await this.seedTenants();
    await this.seedOptions();
    await this.seedApartments();
  }
}