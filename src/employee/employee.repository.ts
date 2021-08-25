import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { Employee, EmployeeDocument } from './Employee';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async find(): Promise<Employee[]> {
    return this.employeeModel.find({});
  }

  async findByDateCreated(
    employeeFilterQuery: FilterQuery<EmployeeDocument>,
  ): Promise<Employee[]> {
    return this.employeeModel.find(employeeFilterQuery);
  }

  async create(employee: Employee): Promise<Employee> {
    const newEmployee = new this.employeeModel(employee);
    return newEmployee.save();
  }
}
