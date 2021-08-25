import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Check, CheckDocument } from './Check';

@Injectable()
export class CheckRepository {
  constructor(
    @InjectModel(Check.name) private checkModel: Model<CheckDocument>,
  ) {}

  async findLatestCheck(
    checkFilterQuery: FilterQuery<CheckDocument>,
  ): Promise<Check[]> {
    return this.checkModel
      .find()
      .where('employee')
      .equals(checkFilterQuery.employee)
      .sort({ date: -1 })
      .limit(1)
      .exec();
  }

  async create(check: Check): Promise<Check> {
    const newCheck = new this.checkModel(check);
    return newCheck.save();
  }
}
