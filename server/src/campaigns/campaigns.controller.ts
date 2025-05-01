import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './campaign.dto';
import { AdCampaign } from './campaign.entity';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get()
  async getAllCampaigns(
    @Paginate() query: PaginateQuery,
  ): Promise<Paginated<AdCampaign>> {
    return await this.campaignsService.getAll(query);
  }

  @Get(':id')
  async getCampaignById(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return await this.campaignsService.getById(id);
  }

  @Post()
  @HttpCode(201)
  createCampaign(@Body() campaign: CreateCampaignDto) {
    return this.campaignsService.create(campaign);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteCampaign(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.campaignsService.delete(id);
  }

  @Patch(':id')
  async updateCampaign(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() campaign: UpdateCampaignDto,
  ) {
    return await this.campaignsService.update(id, campaign);
  }
}
