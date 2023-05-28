import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypegooseModule } from "nestjs-typegoose";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getMongoconfig } from "./config/mongo.config";
import { TesseractModule } from "./tesseract/tesseract.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getMongoconfig,
    }),
    AuthModule,
    TesseractModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
