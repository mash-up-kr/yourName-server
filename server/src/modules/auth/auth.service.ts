import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collection } from 'src/entities/collection.entity';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { PayloadSchema, TokenSchema } from '../../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

    @InjectRepository(UserOnboarding)
    private readonly userOnboardingRepository: Repository<UserOnboarding>,

    private readonly jwtService: JwtService,
  ) {}

  async createUser(nickName: string, providerName: string): Promise<User> {
    let user = await this.userRepository.findOne({
      nickName: nickName,
      providerName: providerName,
    });
    if (user) {
      return user;
    }
    user = new User();
    user.nickName = nickName;
    user.providerName = providerName;
    await this.userRepository.save(user);

    const userOnboarding = new UserOnboarding();
    userOnboarding.userId = user.id;
    await this.userOnboardingRepository.save(userOnboarding);

    return user;
  }

  async login(user: User): Promise<TokenSchema> {
    const payload = { userId: user.id, nickName: user.nickName };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '1m', //만료시간 수정
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '2m', //만료시간 수정
    });

    const currentHashedRefreshToken = await hash(refreshToken, 10);
    user.refreshToken = currentHashedRefreshToken;
    await this.userRepository.save(user);
    return { accessToken: accessToken, refreshToken: refreshToken };
  }

  async logout(userId: number): Promise<void> {
    this.userRepository.update({ id: userId }, { refreshToken: '' });
  }

  async isRefreshTokenMatching(payload: any): Promise<PayloadSchema> {
    const user = await this.userRepository.findOne({ id: payload.userId });
    if (!user) throw new UnauthorizedException();

    return { userId: payload.userId, nickName: payload.nickName };
  }

  async refresh(user: User): Promise<TokenSchema> {
    const payload = { userId: user.id, sub: user.nickName };
    const newAccessToken = this.jwtService.sign(payload);
    return { accessToken: newAccessToken };
  }
}
