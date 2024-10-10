// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { AuthController } from './auth.controller'; // Certifique-se de importar o controlador de autenticação
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model/user.model';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET|| 'adrianocruz',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController, UserController], // Certifique-se de que AuthController está listado aqui
})
export class AuthModule {}
