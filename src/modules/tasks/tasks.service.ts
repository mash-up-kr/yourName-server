import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as AWS from 'aws-sdk';
import { ImageService } from '../images/images.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly _s3: AWS.S3;

  constructor(private readonly imageService: ImageService) {
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

  async findListObjects(): Promise<string[]> {
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
      return KeyArr;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }

  async compareKey(s3: string[], db: string[]): Promise<string[]> {
    const result = s3.filter((e) => !db.includes(e));
    return result;
  }

  async getComparedList(): Promise<string[]> {
    const keyArrInDB = await this.imageService.findImageKeys();
    const keyArrInS3 = await this.findListObjects();
    const comparedArr = await this.compareKey(keyArrInS3, keyArrInDB);
    return comparedArr;
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async deleteObjects() {
    try {
      this.logger.log('Search :: images not in use');
      const keys = await this.getComparedList();
      if (Array.isArray(keys) && keys.length === 0) {
        this.logger.log('Success :: No images not in use');
        return;
      }
      const objects = keys.map((e) => ({ Key: e }));
      await this._s3
        .deleteObjects({
          Bucket: process.env.AWS_S3_BUCKT_NAME,
          Delete: { Objects: objects },
        })
        .promise();
      this.logger.log('Success :: Deleted images not in use');
      return;
    } catch (error) {
      throw new InternalServerErrorException(error.message, error);
    }
  }
}
