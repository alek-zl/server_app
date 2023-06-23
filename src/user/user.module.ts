import { prop } from "@typegoose/typegoose";
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {}
export class UserModel extends TimeStamps {
  @prop()
  name: string;
  
  @prop()
  gender: "мужской" | "женский";
  
  @prop()
  dateOfBirth: string;
  
  @prop({ required: true, unique: true })
  phone: string;
}