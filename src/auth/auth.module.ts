import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { TypegooseModule } from "nestjs-typegoose";
import { getJwtconfig } from "../config/jwt.config";
import { UserModel } from "../user/user.module";
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports:[
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User'
        }
      }
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtconfig
    })
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
