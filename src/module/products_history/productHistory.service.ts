import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProductHistoryEntity} from "./productHistory.entity";
import {BodyCreateHistory, BodyUpdateHistory} from "./productHistory.dto";
import {ProductsService} from "../products/products.service";

@Injectable()
export class ProductHistoryService {
    constructor(@InjectRepository(ProductHistoryEntity)
                private readonly historyRepository : Repository<ProductHistoryEntity>,
                private productService : ProductsService,
    ) {}

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

    // get product_id
    // async getProductByHistory(product_id : string): Promise<any>{
    //     try {
    //         const listHistory = this.historyRepository.createQueryBuilder('h')
    //             .leftJoinAndSelect('h.products', 'p')
    //             .where('p.product_id = :product_id',{product_id : product_id})
    //         const result = await listHistory.getMany();
    //         return  result;
    //     }catch (err){
    //         console.log('errors',err);
    //     }
    // }

    // create history
    async createProductHistory(data : BodyCreateHistory) : Promise<any>{
       try {
           const productBy = await this.productService.getByID(data.products);

           const productHistory = new ProductHistoryEntity();
           productHistory.quantity = data.quantity;
           productHistory.measurement = data.measurement;
           productHistory.products = productBy;

           const result =  await this.historyRepository.save(productHistory);
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The product history cannot create', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // update history
    async updateProductHistory(data : BodyUpdateHistory , history_id : string) : Promise<any>{
        try {
            // check exists history_id
            const existsHistoryID = await this.historyRepository.findOne({where : {history_id: history_id}});
            if(!existsHistoryID){
                throw new HttpException('The product history is not found',HttpStatus.NOT_FOUND);
            }

            // update
            const productBy = await this.productService.getByID(data.products);
            const historyEntity = new ProductHistoryEntity()
            historyEntity.quantity = data.quantity
            historyEntity.measurement = data.measurement
            historyEntity.products = productBy;

            const result = await this.historyRepository.update(history_id,historyEntity);
            return result;
        }catch (err){
            console.log('errors',err);
            throw new HttpException('The product history cannot update',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // delete history
    async deleteProductHistory(history_id : string) : Promise<any>{
        try {
            // check exists product history
            const productHistory = await this.historyRepository.findOne({where : {history_id : history_id}});
            if(!productHistory){
                throw new HttpException('The product history is not found',HttpStatus.NOT_FOUND);
            }

            // delete
            const result = await this.historyRepository.delete(history_id);
            return result;

        }catch (err){
            console.log('errors',err);
            throw new HttpException('The product history cannot delete',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}