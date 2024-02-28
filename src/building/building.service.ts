import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from './entities/building.entity';
import { DeepPartial, Repository } from 'typeorm';
import { AssignApartmentToBuildingDto } from './dto/assign-apartment-to-building.dto';
import { ApartmentEntity } from 'src/apartment/entities/apartment.entity';
import { AddressEntity } from 'src/address/entities/address.entity';
import { AssignAddressToBuildingDto } from './dto/assign-adress-to-building.dto';

@Injectable()
export class BuildingService {

  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepository: Repository<ApartmentEntity>,
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
  ) {}

  create(createBuildingDto: CreateBuildingDto) {
    const newBuilding = this.buildingRepository.create(createBuildingDto as DeepPartial<BuildingEntity>);
    return this.buildingRepository.save(newBuilding); 
  }

  async assignApartment(buildingId: number, assignApartmentDto: AssignApartmentToBuildingDto) {
    const { apartmentId } = assignApartmentDto;

    const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
    if (!building) {
      throw new NotFoundException('Building not found');
    }

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    apartment.building = building;

    await this.apartmentRepository.save(apartment);

    return apartment;
  }

  async assignAddress(buildingId: number, assignAddressDto: AssignAddressToBuildingDto) {
    const { addressId } = assignAddressDto;
  
    const building = await this.buildingRepository.findOne({ where: { id: buildingId } });
    if (!building) {
      throw new NotFoundException('Building not found');
    }
    
    const address = await this.addressRepository.findOne({ where: { id: addressId } });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
  
    // Mise à jour de l'adresse avec l'ID du bâtiment
    address.building = building;

    // Enregistrer les modifications apportées à l'adresse
    await this.addressRepository.save(address);

    return address;
  }

  findAll() {
    return this.buildingRepository.find({relations: ['apartments']});
  }

  findOne(id: number) {
    return this.buildingRepository.findOne({ where: { id } });
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const building = await this.buildingRepository.findOne({ where: { id } });
    Object.assign(building, updateBuildingDto);
    return this.buildingRepository.save(building);
  }

  remove(id: number) {
    return this.buildingRepository.delete(id);
  }
}
