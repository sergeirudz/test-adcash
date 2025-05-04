import { Test, TestingModule } from '@nestjs/testing';
import { CampaignsController } from './campaigns.controller';
import { CampaignsService } from './campaigns.service';

describe('CampaignsController', () => {
  let controller: CampaignsController;
  let service: CampaignsService;

  beforeEach(async () => {
    const mockCampaignsService = {
      create: jest.fn((dto) => ({ id: 'id-12345', ...dto })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignsController],
      providers: [
        {
          provide: CampaignsService,
          useValue: mockCampaignsService,
        },
      ],
    }).compile();

    controller = module.get<CampaignsController>(CampaignsController);
    service = module.get<CampaignsService>(CampaignsService);
  });

  it('should create a campaign', () => {
    const campaignDto = { campaignName: 'Test Campaign' };
    controller.createCampaign(campaignDto as any);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(campaignDto);
  });
});
