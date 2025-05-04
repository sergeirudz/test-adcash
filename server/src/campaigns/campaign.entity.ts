import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AdCampaign {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    length: 200,
  })
  campaignName: string;

  @Column('json')
  deviceType: Record<string, any>[];

  @Column('json')
  geoTargeting: {
    worldwide: boolean;
    countries: string[];
  };

  @Column('json')
  campaignGoals: Record<string, any>[];

  @Column('json')
  supplySources: Record<string, any>[];

  @Column('json')
  userInterests: Record<string, any>[];

  @Column('json')
  websiteCategories: Record<string, any>[];

  @Column('json')
  deviceOsTargeting: Record<string, any>[];

  @Column('json')
  deviceBrowserTargeting: Record<string, any>[];

  @Column('json')
  deviceLanguageTargeting: Record<string, any>[];

  @Column('json')
  contentTargeting: Record<string, any>[];

  @Column('json')
  trafficRestrictions: Record<string, any>[];

  @Column('json')
  connectionType: Record<string, any>[];

  @Column('json')
  connectionOrganizationsIsp: Record<string, any>[];

  @Column('json')
  adCreatives: Record<string, any>[];

  @Column('json')
  weeklyDistribution: Record<string, any>[];

  @Column('json')
  budget: Record<string, any>[];

  @Column('json')
  campaignScheduling: Record<string, any>[];

  @Column('json')
  zoneCapping: Record<string, any>[];

  @Column()
  statusAfterValidation: boolean;

  @Column('json')
  capping: Record<string, any>[];

  @Column()
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
