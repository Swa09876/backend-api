import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

const clientSelect = {
  id: true,
  fullName: true,
  email: true,
  phone: true,
  address: true,
  duration: true,
  numberOfPeople: true,
  techStack: true,
  moneyProvided: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class ClientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.prisma.client.create({
        data: createClientDto,
        select: clientSelect,
      });

      return {
        message: 'Client created successfully',
        client,
      };
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async findAll() {
    const clients = await this.prisma.client.findMany({
      select: clientSelect,
      orderBy: { createdAt: 'desc' },
    });

    return {
      message: 'Clients retrieved successfully',
      count: clients.length,
      clients,
    };
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      select: clientSelect,
    });

    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    return {
      message: 'Client retrieved successfully',
      client,
    };
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      const client = await this.prisma.client.update({
        where: { id },
        data: updateClientDto,
        select: clientSelect,
      });

      return {
        message: 'Client updated successfully',
        client,
      };
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.client.delete({
        where: { id },
      });

      return {
        message: 'Client removed successfully',
        id,
      };
    } catch (error) {
      this.handlePrismaError(error, id);
    }
  }

  private handlePrismaError(error: unknown, id?: string): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new ConflictException('Client with this email already exists');
      }

      if (error.code === 'P2025' && id) {
        throw new NotFoundException(`Client with ID ${id} not found`);
      }
    }

    throw error;
  }
}


