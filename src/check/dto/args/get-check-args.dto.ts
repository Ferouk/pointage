import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Employee } from '../../../employee/Employee';

@ArgsType()
export class GetEmployeeArgs {
  @IsNotEmpty()
  employee: Employee;
}
