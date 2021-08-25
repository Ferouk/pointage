import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'mongoose';
import { DatabaseService } from '../database/database.service';
import { employeeStub } from './__mocks__/stubs/employee.stub';
import { AppModule } from '../app.module';

describe('EmployeeController (e2e)', () => {
  let app: INestApplication;
  let dbConnection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
  });

  it('/api/employee (GET)', async () => {
    await dbConnection.collection('employees').insertOne(employeeStub());
    const response = await request(app.getHttpServer()).get('/api/employee');
    expect(response.status).toBe(200);
    expect({
      firstName: response.body[0].firstName,
      name: response.body[0].name,
      department: response.body[0].department,
      dateCreated: new Date(response.body[0].dateCreated),
    }).toMatchObject(employeeStub());
  });

  it('/api/employee/date/:date (GET)', async () => {
    await dbConnection.collection('employees').insertOne(employeeStub());
    const response = await request(app.getHttpServer()).get(
      '/api/employee/date/2021-08-23',
    );
    expect(response.status).toBe(200);
    expect({
      firstName: response.body[0].firstName,
      name: response.body[0].name,
      department: response.body[0].department,
      dateCreated: new Date(response.body[0].dateCreated),
    }).toMatchObject(employeeStub());
  });

  it('/api/employee (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/employee')
      .send(employeeStub());
    expect(response.status).toBe(201);
    expect({
      firstName: response.body.firstName,
      name: response.body.name,
      department: response.body.department,
      dateCreated: expect.anything(),
    }).toMatchObject(employeeStub());
  });

  afterAll(async () => {
    await dbConnection.collection('employees').deleteMany({});
    await app.close();
  });
});
