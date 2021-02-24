import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  login: string;

  @Prop()
  role: string;

  @Prop({
    type: String,
    set: (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
