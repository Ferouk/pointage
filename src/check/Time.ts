import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from '../employee/Employee';

export type TimeDocument = Time & Document;

@ObjectType()
@Schema()
export class Time {
  @Field()
  @Prop({ type: Types.ObjectId, ref: Employee.name })
  employee: string;

  @Field()
  @Prop()
  time: number;
}

export const TimeSchema = SchemaFactory.createForClass(Time);
