import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsString,
  Length,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 200)
  campaignName: string;

  @IsArray()
  @IsNotEmpty()
  deviceType: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  geoTargeting: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  supplySources: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  userInterests: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  websiteCategories: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  deviceOsTargeting: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  deviceBrowserVTargeting: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  deviceLanguageTargeting: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  contentTargeting: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  trafficRestrictions: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  connectionType: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  connectionOrganizationsIsp: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  adCreatives: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  weeklyDistribution: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  budget: Record<string, any>[];

  @IsArray()
  campaignScheduling: Record<string, any>[];

  @IsArray()
  @IsNotEmpty()
  zoneCapping: Record<string, any>[];

  @IsBoolean()
  @IsNotEmpty()
  statusAfterValidation: boolean;

  @IsObject()
  @IsNotEmpty()
  capping: Record<string, any>[];

  @IsBoolean()
  active: boolean;

  @IsDateString()
  createdAt: Date;
}

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {}
