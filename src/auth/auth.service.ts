import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ModelType } from "@typegoose/typegoose/lib/types";
import { compare, genSalt, hash } from "bcryptjs";
import { InjectModel } from "nestjs-typegoose";
import { UserModel } from "src/user/user.module";
import { AuthDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>, private readonly JwtService: JwtService) {}
  async login(dto:AuthDto){
    //validate
    const user = await this.validateUser(dto)
    
    const tokens = await this.issueTokenPair(String(user._id))
    //generate
    //return
    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }
  async register(dto:AuthDto){
    const oldUser = await this.UserModel.findOne({phone: dto.phone})
    if(oldUser) throw new BadRequestException('User in the system')
    
    const salt = await genSalt(10)
    const newUser = new this.UserModel({phone: dto.phone, password: await hash(dto.password, salt)})
    const user = await newUser.save()
    
    const tokens = await this.issueTokenPair(String(user._id))

    return {
      user: this.returnUserFields(user),
      ...tokens
    }
  }
  
  async validateUser(dto: AuthDto){
    const user = await this.UserModel.findOne({phone: dto.phone})
    if(!user) throw new UnauthorizedException('User not found')
    
    const isValidPassword = await compare(dto.password, user.password)
    if(!isValidPassword) throw new UnauthorizedException('Invalid password')
    return user
    
  }
  async issueTokenPair(_id:string){
    const data = { _id }
    const accessToken = await this.JwtService.signAsync(data,{
      expiresIn: '10d'
    })
    return {accessToken}
  
  }
  // 1.5
  returnUserFields(user: UserModel){
    return{
      _id: user._id,
      phone: user.phone,
    }
  }
}
