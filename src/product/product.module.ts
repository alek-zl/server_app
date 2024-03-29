import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ProductService } from './product.service';
import { ProductModel } from '../module/product.model';
import { ProductController } from './product.controller'
@Module({
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: ProductModel,
				schemaOptions: {
					collection: 'Product'
				}
			}
		]),
		
	],
	controllers: [ProductController],
	providers: [ProductService,],
	
})
export class ProductModule {}