// src/profile/profile.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegisterProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { UserDto } from './dto/profile.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new profile' })
  register(@Body() dto: RegisterProfileDto) {
    return this.profileService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login profile & get token' })
  login(@Body() dto: UserDto) {
    return this.profileService.login(dto.email, dto.password);
  }

  @Get('logout')
  @ApiOperation({ summary: 'Logout profile' })
  logout() {
    return { message: 'Logged out successfully' };
  }

  @Put('updateProfile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update profile details' })
  update(@Req() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.id, dto);
  }
}
