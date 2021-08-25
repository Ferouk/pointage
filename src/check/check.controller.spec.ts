import { Test, TestingModule } from '@nestjs/testing';
import { CheckController } from './check.controller';
import { CheckService } from './check.service';
import { Check } from './Check';
import { checkStub } from './__mocks__/stubs/check.stub';

jest.mock('./check.service.ts');

describe('CheckController', () => {
  let controller: CheckController;
  let service: CheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CheckController],
      providers: [CheckService],
    }).compile();

    controller = module.get<CheckController>(CheckController);
    service = module.get<CheckService>(CheckService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkIn', () => {
    describe('when checkIn is called', () => {
      let checkIn: Check;

      beforeEach(async () => {
        checkIn = await controller.checkIn(checkStub());
      });

      it('should call Check Service', () => {
        expect(service.checkIn).toBeCalled();
      });

      it('should return a list of checkIn', () => {
        expect(checkIn).toEqual(checkStub());
      });
    });
  });

  describe('checkOut', () => {
    describe('when checkOut is called', () => {
      let checkOut: Check;

      beforeEach(async () => {
        checkOut = await controller.checkOut(checkStub());
      });

      it('should call Check Service', () => {
        expect(service.checkOut).toBeCalled();
      });

      it('should return a checkOut', () => {
        expect(checkOut).toEqual(checkStub());
      });
    });
  });
});
