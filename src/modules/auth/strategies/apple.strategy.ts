import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwksClient from 'jwks-rsa';
import * as jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';
import { AxiosClient } from '../axios-client';
import {
  IdentityTokenHeader,
  IdentityTokenSchema,
  ApplePublicKeyType,
} from '../../../interfaces/auth.interface';

@Injectable()
export class AppleStrategy {
  private readonly audience: string;
  private readonly issue: string;

  constructor(private readonly api: AxiosClient) {
    this.audience = 'com.crew.yourname.meetu';
    this.issue = 'https://appleid.apple.com';
  }

  public async ValidateTokenAndDecode(
    identity_token: string,
  ): Promise<IdentityTokenSchema> {
    const tokenDecodedHeader: IdentityTokenHeader =
      jwtDecode<IdentityTokenHeader>(identity_token, {
        header: true,
      });
    const applePublicKeys: ApplePublicKeyType = await this.api.Get(
      'https://appleid.apple.com/auth/keys',
    );
    const client: jwksClient.JwksClient = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
    });

    const kid: string = tokenDecodedHeader.kid;
    const alg: string = tokenDecodedHeader.alg;
    const validKid: string = applePublicKeys.keys.filter(
      (element) => element['kid'] === kid && element['alg'] === alg,
    )[0]?.['kid'];
    if (!validKid) {
      throw new UnauthorizedException();
    }

    const key: jwksClient.CertSigningKey | jwksClient.RsaSigningKey =
      await client.getSigningKey(validKid);
    const publicKey: string = key.getPublicKey();

    try {
      const result: IdentityTokenSchema = jwt.verify(
        identity_token,
        publicKey,
      ) as IdentityTokenSchema;
      this.ValidateToken(result);
      return result;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private ValidateToken(token: IdentityTokenSchema): void {
    if (token.iss !== this.issue) {
      throw new UnauthorizedException();
    }
    if (token.aud !== this.audience) {
      throw new UnauthorizedException();
    }
  }
}
