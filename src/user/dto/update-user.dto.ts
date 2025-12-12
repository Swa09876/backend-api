import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  profileBio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  profileSkills?: string[];

  @IsOptional()
  @IsUrl()
  profileResume?: string;

  @IsOptional()
  @IsString()
  profileResumeOriginalName?: string;

  @IsOptional()
  @IsString()
  profilePhoto?: string;

  @IsOptional()
  @IsString()
  role?: 'student' | 'recruiter';
}
