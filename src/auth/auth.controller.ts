import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe, Headers, Param } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService:AuthService) {
  }
  //localhost:4200/api/auth/login
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto, @Headers() headers: any) {
    console.log(dto); // DTO данные от пользователя
    console.log(headers); // Заголовки запроса
    return this.AuthService.login(dto);
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto, @Param('id') userId: string) {
    console.log(dto); // DTO данные от пользователя
    console.log(userId); // ID пользователя из параметра маршрута
    return this.AuthService.register(dto);
  }
}
