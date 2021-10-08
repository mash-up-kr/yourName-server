import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as AWS from 'aws-sdk';
import { Image } from 'src/entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  private readonly _s3: AWS.S3;

  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {
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
        key: key,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  async findListObjects(): Promise<any> {
    try {
      const objectArr = await this._s3
        .listObjects({
          Bucket: process.env.AWS_S3_BUCKT_NAME,
          Prefix: 'profile/',
        })
        .promise();
      const ContentsArr = objectArr.Contents;
      const KeyArr = ContentsArr.map((e) => e.Key).filter((e) => {
        return e != 'profile/';
      });
      console.log(KeyArr);
      return KeyArr;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  async findListImagesUrl(): Promise<Image[]> {
    try {
      const images = await this.imageRepository.find();
      return images;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  async compareUrl(s3: string[], db: string[]) {
    const result = db.filter((e) => !s3.includes(e));
    return result;
  }
}
