import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema({ timestamps: true })
export class Session {
  @Prop({ type: Types.ObjectId, required: true })
  mentorId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  menteeId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ enum: ['pending', 'confirmed', 'canceled'], default: 'pending' })
  status: 'pending' | 'confirmed' | 'canceled';
}

export const SessionSchema = SchemaFactory.createForClass(Session);
