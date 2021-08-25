import { Employee } from 'src/employee/Employee';

export const employeeStub = (): Employee => {
  return {
    name: 'test',
    firstName: 'test',
    department: 'test',
    dateCreated: new Date('2021-08-23T11:01:58.135Z'),
  };
};
