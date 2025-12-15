import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { Prisma } from '@prisma/client';

type FindAllQuery = {
  jobType?: string;
  location?: string;
  companyId?: string;
  page?: number;
  limit?: number;
};

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const { companyId, ...jobData } = createJobDto;
    
    // Check if company exists
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException(`Company with ID ${companyId} not found`);
    }

    const job = await this.prisma.job.create({
      data: {
        ...jobData,
        company: {
          connect: { id: companyId },
        },
      },
    });

    return job as Job;
  }

  async findAll(query: FindAllQuery): Promise<{ data: Job[]; total: number }> {
    const { jobType, location, companyId, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    
    const where: Prisma.JobWhereInput = {};
    
    if (jobType) {
      where.jobType = jobType as any;
    }
    
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }
    
    if (companyId) {
      where.companyId = companyId;
    }

    const [data, total] = await Promise.all([
      this.prisma.job.findMany({
        where,
        skip,
        take: +limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.job.count({ where }),
    ]);

    return { data: data as Job[], total };
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return job as Job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    // Check if job exists
    await this.findOne(id);

    // If companyId is being updated, verify the company exists
    if (updateJobDto.companyId) {
      const company = await this.prisma.company.findUnique({
        where: { id: updateJobDto.companyId },
      });

      if (!company) {
        throw new NotFoundException(
          `Company with ID ${updateJobDto.companyId} not found`,
        );
      }
    }

    const updatedJob = await this.prisma.job.update({
      where: { id },
      data: updateJobDto,
    });

    return updatedJob as Job;
  }

  async remove(id: string): Promise<void> {
    // Check if job exists
    await this.findOne(id);

    await this.prisma.job.delete({
      where: { id },
    });
  }
}
