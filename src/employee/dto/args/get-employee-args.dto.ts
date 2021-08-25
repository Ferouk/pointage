import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetEmployeeArgs {
  @Field()
  @IsNotEmpty()
  dateCreated: Date;
}
