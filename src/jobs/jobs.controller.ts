import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';

@ApiTags('jobs')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job created successfully', type: Job })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all jobs with optional filtering and pagination' })
  @ApiResponse({ status: 200, description: 'List of jobs', type: [Job] })
  findAll(
    @Query('jobType') jobType?: string,
    @Query('location') location?: string,
    @Query('companyId') companyId?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.jobsService.findAll({
      jobType,
      location,
      companyId,
      page,
      limit,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a job by ID' })
  @ApiResponse({ status: 200, description: 'Job found', type: Job })
  @ApiResponse({ status: 404, description: 'Job not found' })
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a job' })
  @ApiResponse({ status: 200, description: 'Job updated successfully', type: Job })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Job or Company not found' })
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a job' })
  @ApiResponse({ status: 204, description: 'Job deleted successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
