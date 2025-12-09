import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  // SIGNUP
  async register(dto: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (userExists) throw new UnauthorizedException("User already exists");

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: dto.password, // In production, hash the password before saving
      },
    });

    return {
      message: 'User registered successfully',
      access_token: this.jwt.sign({ email: user.email, sub: user.id }),
    };
  }

  // LOGIN
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || user.password !== dto.password)
      throw new UnauthorizedException("Invalid email or password");

    return {
      message: 'Login successful',
      access_token: this.jwt.sign({ email: user.email, sub: user.id }),
    };
  }
}
