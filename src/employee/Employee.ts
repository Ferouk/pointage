import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@ObjectType()
@Schema()
export class Employee {
  @Field()
  @Prop()
  name: string;

  @Field()
  @Prop()
  firstName: string;

  @Field()
  @Prop()
  dateCreated: Date;

  @Field()
  @Prop()
  department: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
