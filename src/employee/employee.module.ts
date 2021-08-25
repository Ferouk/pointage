import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee, EmployeeSchema } from './Employee';
import { EmployeeRepository } from './employee.repository';
import { EmployeeResolver } from './employee.resolver';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository, EmployeeResolver],
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
})
export class EmployeeModule {}
