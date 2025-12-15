import { ApiProperty } from '@nestjs/swagger';

export class Company {
  @ApiProperty({ description: 'Company ID', example: '507f1f77bcf86cd799439011' })
  id: string;

  @ApiProperty({ description: 'Company name', example: 'Acme Inc.' })
  name: string;

  @ApiProperty({ 
    description: 'Company description', 
    example: 'A leading tech company', 
    nullable: true,
    required: false 
  })
  description: string | null;

  @ApiProperty({ 
    description: 'Company website', 
    example: 'https://acme.com', 
    nullable: true,
    required: false 
  })
  website: string | null;

  @ApiProperty({ 
    description: 'Company location', 
    example: 'San Francisco, CA', 
    nullable: true,
    required: false 
  })
  location: string | null;

  @ApiProperty({ 
    description: 'URL to company logo', 
    example: 'https://acme.com/logo.png', 
    nullable: true,
    required: false 
  })
  logoUrl: string | null;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;
}
