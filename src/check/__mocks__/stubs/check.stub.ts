import { Check } from 'src/check/Check';

export const checkStub = (): Check => {
  return {
    employee: '123',
    type: 'IN',
    date: new Date('2021-08-23T11:01:58.135Z'),
    comment: 'test',
  };
};
