import { Module } from '@nestjs/common';
import { ImagesModule } from '../images/images.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [ImagesModule],
  providers: [TasksService],
})
export class TasksModule {}
