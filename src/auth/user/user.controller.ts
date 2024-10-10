// src/auth/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('Login') // Ajuste o nome da tag para "Auth"
@Controller('register') // Certifique-se de que o caminho está correto
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({
    description: 'Dados para criar um novo usuário',
    schema: {
      example: {
        username: 'newuser',
        password: 'securepassword123',
      },
    },
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
