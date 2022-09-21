import {HttpException, HttpStatus, Injectable, Res} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {ProductHistoryEntity} from "./productHistory.entity";
import {BodyCreateHistory} from "./productHistory.dto";
import {rejects} from "assert";
import {ProductsService} from "../products/products.service";

@Injectable()
export class ProductHistoryService {
    constructor(@InjectRepository(ProductHistoryEntity) private readonly historyRepository : Repository<ProductHistoryEntity>,
                private productService : ProductsService) {}

    // find all products_history
    async getAllHistory(filter : any = {} ) : Promise<any>{
        const history  = await this.historyRepository.find(filter);
        return history;
    }

    // find products_history by id
    async getHistoryByID(history_id : string) : Promise<any>{
        const history  = await this.historyRepository.findOne({where : {history_id:history_id}});
        return history;
    }

    // create history
    async createProductHistory(data : BodyCreateHistory, product_id : string) : Promise<any>{
       try {
           const productBy = await this.productService.getByProduct_id(product_id);

           const productHistory = new ProductHistoryEntity();
           productHistory.quantity = data.quantity;
           productHistory.measurement = data.measurement;
           productHistory.products = productBy;

           const result =  await this.historyRepository.save(productHistory);
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The product history cannot create', HttpStatus.INTERNAL_SERVER_ERROR)
       }
    }

}