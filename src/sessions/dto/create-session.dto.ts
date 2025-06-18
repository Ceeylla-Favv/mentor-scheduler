import { IsDateString, IsEnum, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
    @ApiProperty({
    description: 'ID of the mentor',
    example: '664fdd5595c5f3aa76d21a3f',
  })
  @IsMongoId()
  mentorId: string;

  @ApiProperty({
    description: 'ID of the mentee',
    example: '664fdd5595c5f3aa76d21a40',
  })
  @IsMongoId()
  menteeId: string;

  @ApiProperty({
    description: 'Session date (ISO 8601 format)',
    example: '2025-06-20T10:00:00Z',
  })
  @IsDateString()
  date: string;

   @ApiProperty({
    description: 'Status of the session',
    enum: ['pending', 'confirmed', 'canceled'],
    required: false,
    example: 'pending',
  })
  @IsEnum(['pending', 'confirmed', 'canceled'])
  status?: 'pending' | 'confirmed' | 'canceled';
}