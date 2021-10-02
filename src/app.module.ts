import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NameCardModule } from './modules/name-card/name-card.module';
import * as ormconfig from '../ormconfig';
import * as Joi from 'joi';
import { TmisModule } from './modules/tmis/tmis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev',
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot(ormconfig),
<<<<<<< HEAD
    TmisModule,
=======
    NameCardModule,
>>>>>>> f91d214... Wip: 명함 생성 api 테스트 중
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
