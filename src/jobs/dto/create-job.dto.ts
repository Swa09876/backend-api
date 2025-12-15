import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export enum JobType {
  FULLTIME = 'FULLTIME',
  PARTTIME = 'PARTTIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  REMOTE = 'REMOTE',
}

export class CreateJobDto {
  @ApiProperty({ description: 'Job title', example: 'Senior Developer' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Job description', example: 'We are looking for a skilled developer...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Job location', example: 'New York, NY' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ 
    description: 'Required skills',
    example: ['JavaScript', 'Node.js', 'TypeScript'],
    type: [String] 
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  skills: string[];

  @ApiProperty({ 
    description: 'Type of job',
    enum: JobType,
    example: JobType.FULLTIME 
  })
  @IsEnum(JobType)
  @IsNotEmpty()
  jobType: JobType;

  @ApiProperty({ 
    description: 'Minimum salary',
    example: 80000,
    required: false 
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  salaryFrom?: number;

  @ApiProperty({ 
    description: 'Maximum salary',
    example: 120000,
    required: false 
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  salaryTo?: number;

  @ApiProperty({ 
    description: 'Minimum years of experience',
    example: 3,
    required: false 
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  experienceMin?: number;

  @ApiProperty({ 
    description: 'Maximum years of experience',
    example: 5,
    required: false 
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  experienceMax?: number;

  @ApiProperty({ 
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011' 
  })
  @IsString()
  @IsNotEmpty()
  companyId: string;
}
