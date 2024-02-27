import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const newTenant = this.tenantRepository.create(createTenantDto);
    return this.tenantRepository.save(newTenant);
  }

  findAll() {
    return this.tenantRepository.find();
  }

  async findOne(id: number) {
    return await this.tenantRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTenantDto: UpdateTenantDto) {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    Object.assign(tenant, updateTenantDto);
    return this.tenantRepository.save(tenant);
  }

  remove(id: number) {
    return this.tenantRepository.delete(id); 
  }
}
