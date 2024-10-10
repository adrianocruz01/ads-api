// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './user/dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Login') // Ajuste o nome da tag para "Auth"
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login de usuário' })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso e token gerado.' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas.' })
  @ApiBody({
    description: 'Dados de login do usuário',
    schema: {
      example: {
        username: 'admin',
        password: 'admin',
      },
    },
  })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
