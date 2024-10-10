// src/auth/local.strategy.ts
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(); // Aqui você pode configurar campos, como { usernameField: 'email' }
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('LocalStrategy - Validando usuário', { username, password });

    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
