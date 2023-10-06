import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Document } from 'mongoose';
import { ProductModel } from '../module/product.model';
import { ReturnModelType } from '@typegoose/typegoose';
@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel)
		private readonly collection1Model: ReturnModelType<typeof ProductModel>,
	) {}
	
	async create(collection1Data: ProductModel): Promise<Document> {
		const createdCollection1 = new this.collection1Model(collection1Data);
		return createdCollection1.save();
	}
	async findByBarcode(barcode: string): Promise<ProductModel[]> {
		return this.collection1Model.find({ barcode }).exec();
	}
	
}
