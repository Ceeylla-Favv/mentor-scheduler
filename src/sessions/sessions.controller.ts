import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { Session } from './schemas/session.schema';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a session between a mentee and a mentor' })
  @ApiResponse({ status: 201, description: 'Session booked successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or mentor unavailable' })
  @ApiBody({
    type: CreateSessionDto,
    description: 'Mentees should only provide mentorId, menteeId, and date. Status is set automatically.',
  })
  async create(@Body() dto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(dto);
  }

  @Get('/mentor/:id')
  @ApiOperation({ summary: 'Get all sessions for a specific mentor' })
  @ApiResponse({ status: 200, description: 'List of sessions returned' })
  @ApiParam({ name: 'id', description: 'Mentor ID' })
  async findByMentor(@Param('id') id: string): Promise<Session[]> {
    return this.sessionsService.findAllByMentor(id);
  }
}
