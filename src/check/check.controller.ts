import { Body, Controller, Post } from '@nestjs/common';
import { CheckService } from './check.service';
import { CreateCheckInput } from './dto/create-check.input';

@Controller('api/pointage')
export class CheckController {
  constructor(private readonly service: CheckService) {}

  @Post('check-in')
  async checkIn(@Body() createCheckInput: CreateCheckInput) {
    return await this.service.checkIn(createCheckInput);
  }

  @Post('check-out')
  async checkOut(@Body() createCheckInput: CreateCheckInput) {
    return await this.service.checkOut(createCheckInput);
  }
}
