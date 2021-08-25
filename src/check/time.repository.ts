import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Time, TimeDocument } from './Time';

@Injectable()
export class TimeRepository {
  constructor(@InjectModel(Time.name) private timeModel: Model<TimeDocument>) {}

  async create(time: Time): Promise<Time> {
    const newTime = new this.timeModel(time);
    return newTime.save();
  }
}
