import { IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: "User's email" })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    example: 'John Doe', 
    description: "User's full name",
    required: false 
  })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'password123', minLength: 6, description: "User's password" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
