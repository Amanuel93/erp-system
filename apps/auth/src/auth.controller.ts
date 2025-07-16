import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '@app/shared/dto';

class RegisterDto {
  username: string;
  email: string;
  password: string;
}

class LoginDto {
  username: string;
  password: string;
}

class ValidateDto {
  token: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: RegisterDto): Promise<UserDto> {
    return this.authService.register(body.username, body.email, body.password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(body.username, body.password);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validate(@Body() body: ValidateDto): Promise<UserDto> {
    return this.authService.validate(body.token);
  }
}
