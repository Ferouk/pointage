import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'mongoose';
import { DatabaseService } from '../database/database.service';
import { AppModule } from '../app.module';
import { checkStub } from './__mocks__/stubs/check.stub';

describe('CheckController (e2e)', () => {
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

  it('/api/pointage/check-in (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/pointage/check-in')
      .send({
        employee: checkStub().employee,
        comment: checkStub().comment,
      });
    expect(response.status).toBe(201);
    expect({
      employee: response.body.employee,
      type: response.body.type,
      comment: response.body.comment,
      date: expect.anything(),
    }).toMatchObject(checkStub());
  });

  it('/api/pointage/check-out (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/pointage/check-out')
      .send({
        employee: checkStub().employee,
        comment: checkStub().comment,
      });
    expect(response.status).toBe(201);
    expect({
      employee: response.body.employee,
      type: expect.anything(),
      comment: response.body.comment,
      date: expect.anything(),
    }).toMatchObject(checkStub());

    const time = await dbConnection
      .collection('times')
      .findOne({ employee: checkStub().employee });
    expect(typeof time).toBe('object');
  });

  afterAll(async () => {
    await dbConnection.collection('checks').deleteMany({});
    await dbConnection.collection('times').deleteMany({});
    await app.close();
  });
});
