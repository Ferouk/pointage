import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GetEmployeeArgs } from './dto/args/get-employee-args.dto';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './Employee';
import { EmployeeService } from './employee.service';

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => Employee, { name: 'employees', nullable: true })
  async getEmployeeByDateCreated(
    @Args() getEmployeeArgs: GetEmployeeArgs,
  ): Promise<Employee[]> {
    return this.employeeService.findByDateCreated(getEmployeeArgs);
  }

  @Query(() => [Employee], { name: 'employees', nullable: 'items' })
  async getEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Mutation(() => Employee)
  async createEmployee(
    @Args('createEmployeeData') createEmployeeData: CreateEmployeeInput,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeData);
  }
}
