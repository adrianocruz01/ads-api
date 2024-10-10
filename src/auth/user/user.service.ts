// src/auth/user/user.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    // Verifica se o usuário já existe no banco de dados
    const existingUser = await this.findOneByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Usuário já existe');
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criação do usuário com a senha hashada
    return this.userModel.create({
      username,
      password: hashedPassword,
    });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }
}
