import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMentor(): string {
    return 'Mentor-schedule';
  }
}
