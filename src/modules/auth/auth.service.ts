import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Image } from 'src/entities/image.entity';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserOnboarding } from 'src/entities/user-onboarding.entity';
import { PayloadSchema, TokenSchema } from 'src/interfaces/auth.interface';
import { OnboardingSchema } from 'src/interfaces/onboarding.interface';
import { OnboardingTitle } from 'src/constants/onboarding.constant';
import { NameCard } from 'src/entities/name-card.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserOnboarding)
    private readonly userOnboardingRepository: Repository<UserOnboarding>,

    @InjectRepository(NameCard)
    private readonly namecardRepository: Repository<NameCard>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,

    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    userIdentifier: string,
    providerName: string,
  ): Promise<User> {
    let user = await this.userRepository.findOne({
      userIdentifier: userIdentifier,
      providerName: providerName,
    });
    if (user) {
      return user;
    }
    user = new User();
    user.userIdentifier = userIdentifier;
    user.providerName = providerName;
    user = await this.userRepository.save(user);

    const userOnboarding = new UserOnboarding();
    userOnboarding.userId = user.id;
    await this.userOnboardingRepository.save(userOnboarding);

    return user;
  }

  async login(user: User): Promise<TokenSchema> {
    const payload = { userId: user.id, userIdentifier: user.userIdentifier };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '10d', //만료시간 수정
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: '30d', //만료시간 수정
    });

    const currentHashedRefreshToken = await hash(refreshToken, 10);
    user.refreshToken = currentHashedRefreshToken;
    await this.userRepository.save(user);
    const userToReturn: User = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const onboarding: UserOnboarding =
      await this.userOnboardingRepository.findOne({
        where: { userId: user.id },
      });
    const formattedOnboarding: OnboardingSchema[] =
      this._formattingOnboardingRes(onboarding);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: userToReturn,
      userOnboarding: formattedOnboarding,
    };
  }

  _formattingOnboardingRes(onboarding: UserOnboarding): OnboardingSchema[] {
    return [
      ...Object.keys(onboarding)
        .filter((key) => {
          if (key != 'id' && key != 'userId') {
            return key;
          }
        })
        .map((key) => {
          return {
            title: OnboardingTitle[key],
            status: onboarding[key],
          };
        }),
    ];
  }

  async logout(userId: number): Promise<void> {
    await this.userRepository.update({ id: userId }, { refreshToken: null });
  }

  async removeUser(userId: number): Promise<void> {
    const ids: number[] = (
      await this.namecardRepository.find({
        where: { userId: userId },
      })
    ).map((e) => e.imageId);
    await this.userRepository.delete({ id: userId });
    await this.imageRepository.delete({ id: In(ids) });
  }

  async isRefreshTokenMatching(payload: any): Promise<PayloadSchema> {
    const user = await this.userRepository.findOne({ id: payload.userId });
    if (!user) throw new UnauthorizedException();

    return { userId: payload.userId, userIdentifier: payload.userIdentifier };
  }

  async refresh(user: User): Promise<TokenSchema> {
    const payload = { userId: user.id, sub: user.userIdentifier };
    const newAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      expiresIn: '10d', //만료시간 수정
    });
    return { accessToken: newAccessToken };
  }
}
