import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmisController } from './tmis.controller';
import { TmisService } from './tmis.service';
import { Tmi } from '../../entities/tmi.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tmi])],
  controllers: [TmisController],
  providers: [TmisService],
})
export class TmisModule {}
