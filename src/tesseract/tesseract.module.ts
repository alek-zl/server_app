import { Module } from '@nestjs/common';
import { TesseractService } from './tesseract.service';
import { AppController } from './tesseract.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TesseractService],
})
export class TesseractModule {}
