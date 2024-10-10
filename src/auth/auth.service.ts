// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

// src/auth/auth.service.ts
async validateUser(username: string, pass: string): Promise<any> {
    if (!username) {
      throw new Error('Username is required');
    }
  
    const user = await this.userService.findOneByUsername(username);
  
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }
  
    const isPasswordMatching = await bcrypt.compare(pass, user.password);
  
    if (isPasswordMatching) {
      const { password, ...result } = user;
      return result;
    }
  
    throw new UnauthorizedException('Senha incorreta');
  }
  

// src/auth/auth.service.ts
async login(userDto: LoginUserDto) {
    const { username, password } = userDto;

    console.log('Login Data:', userDto);
  
    // Verificar se o username e password foram passados corretamente
    if (!username) {
      throw new Error('Username is required');
    }
  
    const user = await this.validateUser(username, password);
  
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    const payload = { username: user.username, sub: user.id };
  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
