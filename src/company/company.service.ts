import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    try {
      const company = await this.prisma.company.create({
        data: createCompanyDto,
      });
      return company;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'Company with this name already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Failed to create company',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<Company[]> {
    const skip = (page - 1) * limit;
    return this.prisma.company.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });

    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }

    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    try {
      const company = await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
      return company;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      if (error.code === 'P2002') {
        throw new HttpException(
          'Company with this name already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Failed to update company',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      await this.prisma.company.delete({
        where: { id },
      });
      return { message: 'Company deleted successfully' };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Failed to delete company',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
