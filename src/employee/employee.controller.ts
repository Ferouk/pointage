import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { EmployeeService } from './employee.service';

@Controller('api/employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  @Get('date/:date')
  async getUserByDateCreated(@Param('date') date: string) {
    return await this.service.findByDateCreated({
      dateCreated: new Date(date),
    });
  }

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeInput) {
    return await this.service.create(createEmployeeDto);
  }
}
