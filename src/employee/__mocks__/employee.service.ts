import { employeeStub } from './stubs/employee.stub';

export const EmployeeService = jest.fn().mockReturnValue({
  findByDateCreated: jest.fn().mockResolvedValue([employeeStub()]),
  findAll: jest.fn().mockResolvedValue([employeeStub()]),
  create: jest.fn().mockResolvedValue(employeeStub()),
});
