// src/profile/profile.module.ts

import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MY_SECRET_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [ProfileController],
  providers: [ProfileService, PrismaService],
})
export class ProfileModule {}
