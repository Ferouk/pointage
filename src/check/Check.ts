import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Employee } from '../employee/Employee';

export type CheckDocument = Check & Document;

export enum CheckType {
  IN = 'IN',
  OUT = 'OUT',
}

@ObjectType()
@Schema()
export class Check {
  @Field()
  @Prop({ type: Types.ObjectId, ref: Employee.name })
  employee: string;

  @Field()
  @Prop({ enum: CheckType })
  type: string;

  @Field()
  @Prop()
  date: Date;

  @Field()
  @Prop()
  comment: string;
}

export const CheckSchema = SchemaFactory.createForClass(Check);
