import { Injectable } from '@nestjs/common';
import { CreateCheckInput } from './dto/create-check.input';
import { Check } from './Check';
import { CheckRepository } from './check.repository';
import { TimeRepository } from './time.repository';

@Injectable()
export class CheckService {
  constructor(
    private readonly checkRepository: CheckRepository,
    private readonly timeRepository: TimeRepository,
  ) {}

  async checkIn(createCheckInput: CreateCheckInput): Promise<Check> {
    const now = new Date();
    const LastCheck = await this.getLastCheck(createCheckInput);
    if (!LastCheck || LastCheck.type === 'OUT') {
      return await this.checkRepository.create({
        employee: createCheckInput.employee,
        comment: createCheckInput.comment,
        type: 'IN',
        date: now,
      });
    }
  }

  async spentTime(
    createCheckInput: CreateCheckInput,
    now: Date,
  ): Promise<void> {
    const lastCheck = await this.getLastCheck(createCheckInput);
    const time = now.getTime() - new Date(lastCheck.date).getTime();
    this.timeRepository.create({
      employee: createCheckInput.employee,
      time,
    });
  }

  async getLastCheck(createCheckInput: CreateCheckInput): Promise<Check> {
    const employee = createCheckInput.employee;

    const lastCheck = await this.checkRepository.findLatestCheck({
      employee,
    });
    return lastCheck[0];
  }

  async checkOut(createCheckInput: CreateCheckInput): Promise<Check> {
    const now = new Date();
    const LastCheck = await this.getLastCheck(createCheckInput);
    if (LastCheck && LastCheck.type === 'IN') {
      await this.spentTime(createCheckInput, now);
      return await this.checkRepository.create({
        employee: createCheckInput.employee,
        comment: createCheckInput.comment,
        type: 'OUT',
        date: now,
      });
    }
  }
}
