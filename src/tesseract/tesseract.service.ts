import { Injectable } from "@nestjs/common";


const tesseract = require('tesseract.js');

@Injectable()
export class TesseractService {
  async recognizeImage(imageBuffer: Buffer): Promise<string> {
    const { data } = await tesseract.recognize(imageBuffer);
    return data.text;
  }
}
