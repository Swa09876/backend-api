import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Full name of the client or company representative',
    example: 'Jane Doe',
  })
  @IsString({ message: 'Full name must be a string' })
  @IsNotEmpty({ message: 'Full name is required' })
  fullName: string;

  @ApiProperty({
    description: 'Unique email address for contacting the client',
    example: 'jane.doe@company.com',
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiPropertyOptional({
    description: 'Optional phone number',
    example: '+1-202-555-0143',
  })
  @IsOptional()
  @IsString({ message: 'Phone must be a string' })
  phone?: string;

  @ApiPropertyOptional({
    description: 'Optional address for the client',
    example: '123 Main Street, Springfield',
  })
  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @ApiProperty({
    description: 'Password to access the client portal',
    example: 'SecurePass123!',
    minLength: 6,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({
    description: 'Desired project duration (e.g., "3 months")',
    example: '6 months',
  })
  @IsString({ message: 'Duration must be a string' })
  @IsNotEmpty({ message: 'Duration is required' })
  duration: string;

  @ApiProperty({
    description: 'Number of people needed for the project',
    example: 5,
  })
  @IsInt({ message: 'Number of people must be an integer' })
  @Min(1, { message: 'Number of people must be at least 1' })
  numberOfPeople: number;

  @ApiProperty({
    description: 'Tech stack requirements',
    example: ['React', 'Node.js', 'MongoDB'],
    type: [String],
  })
  @IsArray({ message: 'Tech stack must be an array' })
  @ArrayMinSize(1, { message: 'Tech stack must include at least one entry' })
  @IsString({ each: true, message: 'Each tech stack entry must be a string' })
  techStack: string[];

  @ApiProperty({
    description: 'Budget the client is offering (in USD)',
    example: 25000,
  })
  @IsInt({ message: 'Budget must be an integer' })
  @Min(0, { message: 'Budget cannot be negative' })
  moneyProvided: number;
}


