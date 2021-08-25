import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CheckService } from './check.service';
import { CreateCheckInput } from './dto/create-check.input';
import { Time } from './Time';

@Resolver(() => Time)
export class TimeResolver {
  constructor(private readonly checkService: CheckService) {}

  @Mutation(() => Time)
  async createTime(
    @Args('createTimeData') createTimeData: CreateCheckInput,
    now: Date,
  ): Promise<void> {
    return this.checkService.spentTime(createTimeData, now);
  }
}
