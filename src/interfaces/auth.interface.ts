import { JwtHeader, JwtPayload } from 'jwt-decode';
import { User } from 'src/entities/user.entity';
import { OnboardingSchema } from './onboarding.interface';

export interface IdentityTokenSchema extends JwtPayload {
  nonce: string;
  c_hash: string;
  email: string;
  email_verified: string;
  is_private_email: string;
  auth_time: number;
}

export interface IdentityTokenHeader extends JwtHeader {
  kid: string;
}

export interface ProviderDataSchema {
  nickName: string;
  providerName: string;
}

export interface ApplePublicKeyType {
  keys: Array<{
    [key: string]: string;
  }>;
}

export interface TokenSchema {
  accessToken: string;
  refreshToken?: string;
  user?: User;
  userOnboarding?: OnboardingSchema[];
}

export interface PayloadSchema {
  userId: number;
  nickName: string;
}
