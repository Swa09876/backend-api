import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('client')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a client',
    description: 'Creates a new client record using the provided payload.',
  })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Client with the same email already exists',
  })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({
    summary: 'List clients',
    description: 'Returns a pageless list of all stored clients.',
  })
  @ApiResponse({
    status: 200,
    description: 'Clients retrieved successfully',
  })
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a client by ID',
    description: 'Returns the client that matches the provided identifier.',
  })
  @ApiParam({
    name: 'id',
    description: 'Client identifier (Mongo ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Client retrieved successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found',
  })
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a client',
    description: 'Updates the client with any subset of available fields.',
  })
  @ApiParam({
    name: 'id',
    description: 'Client identifier (Mongo ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: 200,
    description: 'Client updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found',
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a client',
    description: 'Removes the client record permanently.',
  })
  @ApiParam({
    name: 'id',
    description: 'Client identifier (Mongo ObjectId)',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiResponse({
    status: 200,
    description: 'Client removed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Client not found',
  })
  remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}


