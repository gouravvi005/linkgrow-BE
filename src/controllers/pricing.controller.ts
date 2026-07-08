import { Controller, Get } from '@nestjs/common';
import { pricingPlansData } from '../mock-data/accountsData';

@Controller('pricing')
export class PricingController {
  @Get('plans')
  getPlans() {
    return pricingPlansData;
  }
}
