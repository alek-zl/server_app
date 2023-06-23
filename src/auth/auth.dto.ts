import { IsOptional, IsPhoneNumber, IsString} from "class-validator";


export class AuthDto{
  @IsOptional()
  @IsPhoneNumber()
  phone?:string
  @IsOptional()
  @IsString()
  name?:string
  @IsOptional()
  @IsString()
  gender?:string
  @IsOptional()
  @IsString()
  dateOfBirth?:string
}
