import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignsModule } from './campaigns/campaigns.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdCampaign } from './campaigns/campaign.entity';

@Module({
  imports: [
    CampaignsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      synchronize: true, // false prod
      entities: [AdCampaign],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
