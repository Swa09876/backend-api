import { ApiProperty } from '@nestjs/swagger';
import { Job as PrismaJob } from '@prisma/client';
import { JobType } from '../dto/create-job.dto';

export class Job implements PrismaJob {
  @ApiProperty({ description: 'Job ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Job title', example: 'Senior Developer' })
  title: string;

  @ApiProperty({ description: 'Job description', example: 'We are looking for a skilled developer...' })
  description: string;

  @ApiProperty({ description: 'Job location', example: 'New York, NY' })
  location: string;

  @ApiProperty({ 
    description: 'Required skills',
    example: ['JavaScript', 'Node.js', 'TypeScript'],
    type: [String] 
  })
  skills: string[];

  @ApiProperty({ 
    description: 'Type of job',
    enum: JobType,
    example: JobType.FULLTIME 
  })
  jobType: JobType;

  @ApiProperty({ 
    description: 'Minimum salary',
    example: 80000,
    required: false 
  })
  salaryFrom: number | null;

  @ApiProperty({ 
    description: 'Maximum salary',
    example: 120000,
    required: false 
  })
  salaryTo: number | null;

  @ApiProperty({ 
    description: 'Minimum years of experience',
    example: 3,
    required: false 
  })
  experienceMin: number | null;

  @ApiProperty({ 
    description: 'Maximum years of experience',
    example: 5,
    required: false 
  })
  experienceMax: number | null;

  @ApiProperty({ description: 'Creation date' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date' })
  updatedAt: Date;

  @ApiProperty({ 
    description: 'Company ID',
    example: '507f1f77bcf86cd799439011' 
  })
  companyId: string;
}
