import { Injectable } from '@nestjs/common';
import { AxiosClient } from '../axios-client';

@Injectable()
export class KaKaoStrategy {
  constructor(private readonly api: AxiosClient) {}

  public async ValidateTokenAndDecode(accessToken: string): Promise<any> {
    const apiUrl = 'https://kapi.kakao.com/v2/user/me';
    const header = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      'Authorization': `Bearer ${accessToken}`,
    };
    const kakaoRequestApiResult: any = this.api.Get(apiUrl, {
      headers: header,
    });
    return kakaoRequestApiResult;
  }
}
