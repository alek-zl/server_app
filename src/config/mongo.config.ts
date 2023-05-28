import { ConfigService } from "@nestjs/config";
import { TypegooseModuleOptions } from 'nestjs-typegoose'
export const getMongoconfig = async (configService: ConfigService):Promise<TypegooseModuleOptions> => ({
uri: configService.get('MONGO_URL')
})