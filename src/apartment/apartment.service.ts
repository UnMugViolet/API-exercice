import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { CreateApartmentWithOwnerDto } from './dto/create-apartment-with-owner.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { ApartmentEntity } from './entities/apartment.entity';
import { ApartmentTypeService } from 'src/apartment-type/apartment-type.service';
import { ApartmentTypeEntity } from 'src/apartment-type/entities/apartment-type.entity';
import { OwnerEntity } from 'src/owner/entities/owner.entity';
import { CreateApartmentWithTenantDto } from './dto/create-apartment-with-tenant.dto';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { OptionEntity } from 'src/option/entities/option.entity';
import { CreateApartmentWitOptionDto } from './dto/create-apartment-with-option.dto';


@Injectable()
export class ApartmentService {

  constructor(
    @InjectRepository(ApartmentEntity)
    private readonly apartmentRepository: Repository<ApartmentEntity>,
    @InjectRepository(ApartmentTypeEntity)
    private readonly apartmentTypeRepository: Repository<ApartmentTypeEntity>,
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) { }

  async createApartmentWithType(createApartmentDto: CreateApartmentDto) {
    if (!createApartmentDto.apartmentType) {
      throw new BadRequestException('Apartment type is required');
    }
    const type = await this.apartmentTypeRepository.findOne({ where: { id: createApartmentDto.apartmentType } });

    if (!type) {
      throw new BadRequestException('Apartment type not found');
    }

    const newApartment = this.apartmentRepository.create({
      ...createApartmentDto,
      apartmentType: type
    });

    return this.apartmentRepository.save(newApartment);
  }

  async assignTenant (apartmentId: number, createApartmentWithTenant: CreateApartmentWithTenantDto) {

    const { tenantId } = createApartmentWithTenant;
    if (!createApartmentWithTenant.tenantId) {
      throw new BadRequestException('Tenant ID is required');
    }
    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId }, relations: ['apartmentType', 'tenants'] });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    if (apartment.tenants.length >= apartment.apartmentType.maxOccupancy) {
      throw new BadRequestException('Apartment has reached maximum capacity');
    }
    
    const tenant = await this.tenantRepository.findOne({ where: { id: tenantId } });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }

    tenant.apartment = apartment;

    await this.tenantRepository.save(tenant);

    return tenant;
  }

  async assignOption(createApartmentWitOptionDto: CreateApartmentWitOptionDto) {
    const { apartmentId, optionIds } = createApartmentWitOptionDto;

    const apartment = await this.apartmentRepository.findOne({ where: { id: apartmentId } });
    if (!apartment) {
      throw new NotFoundException('Apartment not found');
    }

    const options = await this.optionRepository.findByIds(optionIds);
    if (options.length !== optionIds.length) {
      throw new NotFoundException('One or more options not found');
    }

    if (!apartment.options) {
      apartment.options = [];
    }

    apartment.options = [...apartment.options, ...options];

    await this.apartmentRepository.save(apartment);

    return apartment;
  }

  findAll() {
    return this.apartmentRepository.find({ relations: ['apartmentType', 'options', 'tenants'] });
  }

  async findOne(id: number): Promise<ApartmentEntity> {
    return await this.apartmentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateApartmentDto: UpdateApartmentDto): Promise<ApartmentEntity> {
    const apartment = await this.apartmentRepository.findOne({ where: { id } });
    Object.assign(apartment, updateApartmentDto);
    return this.apartmentRepository.save(apartment);
  }

  remove(id: number) {
    return this.apartmentRepository.delete(id);
  }
}
