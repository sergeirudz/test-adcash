import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdCampaign } from './campaign.entity';
import { DeleteResult, Repository } from 'typeorm';
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
    const adCreativeUrl = query.filter?.adCreativeUrl;
    const queryBuilder = this.repository.createQueryBuilder('campaign');

    if (adCreativeUrl) {
      const urlValue = Array.isArray(adCreativeUrl)
        ? adCreativeUrl[0]
        : adCreativeUrl;

      queryBuilder.andWhere(
        `EXISTS (
      SELECT FROM jsonb_array_elements(campaign."adCreatives"::jsonb) as creative
      WHERE creative->>'url' ILIKE :url
    )`,
        { url: `%${urlValue}%` },
      );
    }

    return paginate(query, queryBuilder, {
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
    if (!id) {
      throw new BadRequestException('Invalid campaign ID');
    }
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

  async delete(id: number): Promise<DeleteResult> {
    if (!id) {
      throw new BadRequestException('Invalid campaign ID');
    }
    return this.repository.delete(id);
  }

  async toggle(id: number): Promise<AdCampaign> {
    if (!id) {
      throw new BadRequestException('Invalid campaign ID');
    }
    const campaign = await this.repository.findOne({ where: { id } });
    if (!campaign) {
      throw new NotFoundException(`Campaign "${id}" not found`);
    }

    campaign.active = !campaign.active;
    return await this.repository.save(campaign);
  }
}
