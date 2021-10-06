import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class ImageService {
  private readonly _s3: AWS.S3;

  constructor() {
    const options: AWS.S3.Types.ClientConfiguration = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      params: {
        Bucket: process.env.AWS_S3_BUCKT_NAME,
      },
      region: process.env.AWS_S3_REGION,
    };
    this._s3 = new AWS.S3(options);
  }

  async uploadImage(image): Promise<any> {
    try {
      const key = 'profile/' + image.originalname;
      await this._s3
        .putObject({
          Bucket: process.env.AWS_S3_BUCKT_NAME,
          Body: image.buffer,
          ACL: 'public-read',
          Key: key,
          ContentType: image.mimeType,
        })
        .promise();
      return {
        imageUrl: process.env.AWS_S3_PREFIX + key,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }
}
