// src/profile/profile.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {
  RegisterProfileDto,
  UpdateProfileDto,
} from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterProfileDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.profile.create({
      data: {
        fullname: data.fullname,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: hashedPassword,
        role: data.role ?? 'student',
        profileBio: data.profileBio,
        profileSkills: data.profileSkills,
        profileResume: data.profileResume,
        profileResumeOriginalName: data.profileResumeOriginalName,
        profilePhoto: data.profilePhoto,
      },
    });
  }

  async login(email: string, password: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { email },
    });

    if (!profile) throw new UnauthorizedException('Profile not found');

    const correct = await bcrypt.compare(password, profile.password);
    if (!correct) throw new UnauthorizedException('Invalid password');

    const token = this.jwtService.sign({
      id: profile.id,
      role: profile.role,
    });

    return { token, profile };
  }

  async updateProfile(id: string, data: UpdateProfileDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }
}
