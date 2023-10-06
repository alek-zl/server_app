import {Controller, Post, UseInterceptors, UploadedFile, Body} from '@nestjs/common';
import { ProductModel } from '../module/product.model';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class ProductController {
	constructor(private readonly collection1Service: ProductService) {}
	
	@Post('collection1')
	@UseInterceptors(FileInterceptor('image'))
	async createCollection1(
		@UploadedFile() image: Express.Multer.File,
		@Body() collection1Data: ProductModel
	) {
		const imageBase64 = image.buffer.toString('base64');
		collection1Data.image = imageBase64;
		return this.collection1Service.create(collection1Data);
	}
	@Post('search')
	async findByTitle(@Body('barcode') barcode: string): Promise<ProductModel[]> {
		return this.collection1Service.findByBarcode(barcode);
	}
}