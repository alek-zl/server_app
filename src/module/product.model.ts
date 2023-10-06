import { prop } from '@typegoose/typegoose';

export class ProductModel {
	@prop()
	title: string;
	
	@prop()
	price: number;
	
	@prop()
	image: string;
	
	@prop()
	description: string;
	
	@prop()
	barcode: string;
}