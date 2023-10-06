import { BadRequestException, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ModelType } from "@typegoose/typegoose/lib/types"
import { InjectModel } from "nestjs-typegoose"
import { UserModel } from "src/module/user.model"
import { AuthDto } from "./auth.dto"

@Injectable()
export class AuthService {
  constructor(@InjectModel(UserModel) private readonly UserModel: ModelType<UserModel>, private readonly JwtService: JwtService) {
  }
  
  async login(dto: AuthDto) {
    //validate
    const user = await this.UserModel.findOne({ phone: dto.phone })
    let isUserInBD = false
    let verificationCode: string
    
    if (user) {
      isUserInBD = true;
      verificationCode = await this.generateVerificationCode()
      const tokens = await this.issueTokenPair(String(user._id))
      return { isUserInBD, verificationCode, ...tokens }
    } else {
      verificationCode = await this.generateVerificationCode()
      return { isUserInBD, verificationCode }
    }
  }
  
  async generateVerificationCode() {
    const code = Math.floor(Math.random() * 9000 + 1000).toString()
    return code
  }
  
  async issueTokenPair(_id: string) {
    const data = { _id }
    const accessToken = await this.JwtService.signAsync(data, {
      expiresIn: '10d'
    })
    return { accessToken }
  }
  
  
  // заполнение идет здесь
  async register(dto: AuthDto) {
    const oldUser = await this.UserModel.findOne({phone: dto.phone})
    if(oldUser) throw new BadRequestException('User in the system')
    
    
    const newUser = new this.UserModel({phone: dto.phone, name: dto.name, gender: dto.gender, dateOfBirth: dto.dateOfBirth})
    const user = await newUser.save()
    
    const tokens = await this.issueTokenPair(String(user._id))
    
    return {
      gender: user.gender,
      name: user.name,
      dateOfBirth: user.dateOfBirth,
      ...tokens
     }
  }
}