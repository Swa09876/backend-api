import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;

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
