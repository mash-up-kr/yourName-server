import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Collection } from 'src/entities/collection.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,

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

    const collection = new Collection();
    collection.user = user;
    await this.collectionRepository.save(collection);

    return user;
  }

  async login(user: User) {
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

  async logout(user: User): Promise<void> {
    this.userRepository.update(user, { refreshToken: '' });
  }

  async isRefreshTokenMatching(
    refreshToken: string,
    userId: number,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ id: userId });
    const refreshTokenIsMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (refreshTokenIsMatching) return user;
    throw new UnauthorizedException();
  }

  async refresh(user: User): Promise<any> {
    const payload = { userId: user.id, sub: user.nickName };
    const newAccessToken = this.jwtService.sign(payload);
    return newAccessToken;
  }
}
