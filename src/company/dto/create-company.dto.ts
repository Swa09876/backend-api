import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name (must be unique)', example: 'Acme Inc.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Company description', example: 'A leading tech company' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Company website URL', example: 'https://acme.com' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ description: 'Company location', example: 'San Francisco, CA' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ description: 'URL to company logo', example: 'https://acme.com/logo.png' })
  @IsUrl()
  @IsOptional()
  logoUrl?: string;
}
