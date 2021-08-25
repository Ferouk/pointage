import { checkStub } from './stubs/check.stub';

export const CheckService = jest.fn().mockReturnValue({
  checkIn: jest.fn().mockResolvedValue(checkStub()),
  getLastCheck: jest.fn().mockResolvedValue([checkStub()]),
  spentTime: jest.fn().mockResolvedValue(checkStub()),
  checkOut: jest.fn().mockResolvedValue(checkStub()),
});
