import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdCampaign } from './campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto, UpdateCampaignDto } from './campaign.dto';
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(AdCampaign)
    private readonly repository: Repository<AdCampaign>,
  ) {}

  async create(campaign: CreateCampaignDto): Promise<any> {
    return await this.repository.save(campaign);
  }

  async getAll(query: PaginateQuery): Promise<Paginated<AdCampaign>> {
    return paginate(query, this.repository, {
      sortableColumns: ['campaignName', 'createdAt', 'active'],
      searchableColumns: ['campaignName'],
      filterableColumns: {
        campaignName: [FilterOperator.ILIKE],
        active: [FilterOperator.EQ],
      },
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }

  async getById(id: number): Promise<AdCampaign | null> {
    if (!id) return null;
    return await this.repository.findOne({ where: { id } });
  }

  async update(
    id: number,
    campaign: UpdateCampaignDto,
  ): Promise<AdCampaign | null> {
    if (!id || !campaign) return null;

    const existingCampaign = await this.repository.findOne({ where: { id } });
    if (!existingCampaign) return null;

    return this.repository.save({ ...existingCampaign, ...campaign });
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
