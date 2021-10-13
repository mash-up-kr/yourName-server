import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocs } from './images.docs';
import { ImageService } from './images.service';

@ApiTags('Image - 이미지')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiDocs.uploadFile('이미지 업로드')
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image) {
    return await this.imageService.uploadImage(image);
  }
}
