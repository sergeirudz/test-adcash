import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdCampaign } from './campaign.entity';
import { Repository } from 'typeorm';
import { CreateCampaignDto, UpdateCampaignDto } from './campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(AdCampaign)
    private readonly repository: Repository<AdCampaign>,
  ) {}

  async create(campaign: CreateCampaignDto): Promise<any> {
    return await this.repository.save(campaign);
  }

  async getAll(): Promise<AdCampaign[]> {
    return await this.repository.find();
  }
  //
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

    // Merge the existing campaign with the new data
    const updatedCampaign = {
      ...existingCampaign,
      ...campaign,
    };

    return this.repository.save({ ...existingCampaign, ...updatedCampaign });
  }

  async delete(id: number): Promise<any> {
    return this.repository.delete(id);
  }
}
