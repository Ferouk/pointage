import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './Employee';
import { employeeStub } from './__mocks__/stubs/employee.stub';

jest.mock('./employee.service.ts');

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('index', () => {
    describe('when index is called', () => {
      let employees: Employee[];

      beforeEach(async () => {
        employees = await controller.index();
      });

      it('should call Employee Service', () => {
        expect(service.findAll).toBeCalled();
      });

      it('should return a list of Employees', () => {
        expect(employees).toEqual([employeeStub()]);
      });
    });
  });

  describe('find', () => {
    describe('when find is called', () => {
      let employees: Employee[];

      beforeEach(async () => {
        employees = await controller.getUserByDateCreated('2021-08-23');
      });

      it('should call Employee Service', () => {
        expect(service.findByDateCreated).toBeCalled();
      });

      it('should return a list of Employees', () => {
        expect(employees).toEqual([employeeStub()]);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let employee: Employee;

      beforeEach(async () => {
        employee = await controller.create(employeeStub());
      });

      it('should call Employee Service', () => {
        expect(service.create).toBeCalled();
      });

      it('should return a list of Employees', () => {
        expect(employee).toEqual(employeeStub());
      });
    });
  });
});
