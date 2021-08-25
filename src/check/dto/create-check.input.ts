import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCheckInput {
  @Field()
  @IsNotEmpty()
  employee: string;

  @Field()
  @IsNotEmpty()
  type: string;

  @Field()
  @IsNotEmpty()
  date: Date;

  @Field()
  @IsNotEmpty()
  comment: string;
}
