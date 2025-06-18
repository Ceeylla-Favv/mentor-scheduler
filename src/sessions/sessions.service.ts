import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name)
    private sessionModel: Model<SessionDocument>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const sessionDate = new Date(createSessionDto.date);

    
    if (sessionDate <= new Date()) {
      throw new BadRequestException('Cannot book a session in the past.');
    }

    const isBusy = await this.sessionModel.exists({
      mentorId: createSessionDto.mentorId,
      date: sessionDate,
    });

    if (isBusy) {
      throw new BadRequestException('Mentor is not available at this time.');
    }

   
    const newSession = new this.sessionModel({
      ...createSessionDto,
      date: sessionDate,
      status: 'pending',
    });

    return newSession.save();
  }

  async findAllByMentor(mentorId: string): Promise<Session[]> {
    return this.sessionModel.aggregate([
      { $match: { mentorId: new Types.ObjectId(mentorId) } },
      { $sort: { date: 1 } },
      {
        $project: {
          _id: 1,
          mentorId: 1,
          menteeId: 1,
          date: 1,
          status: 1,
        },
      },
    ]);
  }
}
