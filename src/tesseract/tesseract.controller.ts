import { Controller, Get, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from '@nestjs/platform-express';
import { TesseractService } from './tesseract.service';
import { Express } from 'express';

@Controller()
export class AppController {
  constructor(private readonly tesseractService: TesseractService) {}

  @Post('recognize')
  @UseInterceptors(FileInterceptor('image'))
  async recognizeImage(
    @UploadedFile() file: Express.Multer.File): Promise<{ text: string }> {
    const text = await this.tesseractService.recognizeImage(file.buffer);
    console.log({text})
    return { text };
  }
}
