import {  IsPhoneNumber, IsString, MinLength } from "class-validator";


export class AuthDto{
  @IsPhoneNumber()
  phone:string
  
  @MinLength(6,{
    message: 'password cannot be less than 6 characters'
  })
  @IsString()
  password:string
}
