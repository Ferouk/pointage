import { Injectable } from '@nestjs/common';
import { GetEmployeeArgs } from './dto/args/get-employee-args.dto';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './Employee';
import { EmployeeRepository } from './employee.repository';

@Injectable()
export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async findAll(): Promise<Employee[]> {
    return await this.repository.find();
  }

  async findByDateCreated(
    getEmployeeArgs: GetEmployeeArgs,
  ): Promise<Employee[]> {
    const today = new Date(getEmployeeArgs.dateCreated);
    const tomorrow = new Date(getEmployeeArgs.dateCreated);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return await this.repository.findByDateCreated({
      dateCreated: {
        $gte: today,
        $lte: tomorrow,
      },
    });
  }

  async create(createEmployeeDto: CreateEmployeeInput): Promise<Employee> {
    return await this.repository.create({
      ...createEmployeeDto,
      dateCreated: new Date(),
    });
  }
}
