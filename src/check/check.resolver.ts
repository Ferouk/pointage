import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Check } from './Check';
import { CheckService } from './check.service';
import { CreateCheckInput } from './dto/create-check.input';

@Resolver(() => Check)
export class CheckResolver {
  constructor(private readonly checkService: CheckService) {}

  @Mutation(() => Check)
  async createCheck(
    @Args('createCheckData') createCheckData: CreateCheckInput,
  ): Promise<Check> {
    return this.checkService.checkIn(createCheckData);
  }
}
