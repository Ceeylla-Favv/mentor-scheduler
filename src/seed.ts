import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SessionsService } from './sessions/sessions.service';
import mongoose, { Types } from 'mongoose';


async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sessionsService = app.get(SessionsService);

  const sampleSessions = [
    {
      mentorId: new Types.ObjectId('664fdd5595c5f3aa76d21a3f'),
      menteeId: new Types.ObjectId('664fdd5595c5f3aa76d21a40'),
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      mentorId: new Types.ObjectId('664fdd5595c5f3aa76d21a3f'),
      menteeId: new Types.ObjectId('664fdd5595c5f3aa76d21a40'),
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  for (const session of sampleSessions) {
    try {
      await sessionsService.create(session as any);
      console.log('Seeded session:', session.date);
    } catch (err) {
      console.error('Failed to seed:', err.message);
    }
  }

  await app.close();
  mongoose.disconnect();
}
bootstrap();
