import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { KaKaoStrategy } from './strategies/kakao.strategy';
import { AppleStrategy } from './strategies/apple.strategy';
import { AxiosClient } from './axios-client';
import { Collection } from 'src/entities/collection.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { NameCard } from 'src/entities/name-card.entity';
import { Image } from 'src/entities/image.entity';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION },
    }),
    TypeOrmModule.forFeature([
      User,
      Collection,
      UserOnboarding,
      NameCard,
      Image,
    ]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    KaKaoStrategy,
    AppleStrategy,
    AxiosClient,
  ],
})
export class AuthModule {}
