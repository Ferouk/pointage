import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { Check, CheckSchema } from './Check';
import { Time, TimeSchema } from './Time';
import { CheckRepository } from './check.repository';
import { CheckResolver } from './check.resolver';
import { TimeRepository } from './time.repository';
import { TimeResolver } from './time.resolver';

@Module({
  controllers: [CheckController],
  providers: [
    CheckService,
    CheckRepository,
    CheckResolver,
    TimeRepository,
    TimeResolver,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: Check.name, schema: CheckSchema },
      { name: Time.name, schema: TimeSchema },
    ]),
  ],
  exports: [CheckService],
})
export class CheckModule {}
