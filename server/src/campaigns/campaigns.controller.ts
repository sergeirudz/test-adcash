import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './campaign.dto';

@Controller('campaigns')
export class CampaignsController {
  private campaigns: any[] = [];

  constructor(private campaignsService: CampaignsService) {}

  @Get()
  async getAllCampaigns() {
    return await this.campaignsService.getAll();
  }

  @Get(':id')
  async getCampaignById(
    @Param('id')
    id: number,
  ) {
    return await this.campaignsService.getById(id);
  }

  @Post()
  createCampaign(@Body() campaign: CreateCampaignDto) {
    return this.campaignsService.create(campaign);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteCampaign(
    @Param('id')
    id: number,
  ) {
    return this.campaignsService.delete(id);
  }

  @Patch(':id')
  async updateCampaign(
    @Param('id')
    id: number,
    @Body() campaign: UpdateCampaignDto,
  ) {
    return await this.campaignsService.update(id, campaign);
  }
}
