import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductsEntity} from "./products.entity";
import {getManager, Repository} from "typeorm";
import {BodyProductCreate, BodyProductUpdate} from "./products.dto";
import {RoleService} from "../role/role.service";
import {CategoriesService} from "../categories/categories.service";
import {PantryService} from "../pantry_management/pantry.service";
import {AccountService} from "../account/account.service";
import {ProductHistoryEntity} from "../products_history/productHistory.entity";

@Injectable()
export class ProductsService{
    constructor(@InjectRepository(ProductsEntity) private productRepository : Repository<ProductsEntity>,
                    private readonly roleService : RoleService,
                    private readonly categoryService : CategoriesService,
                    private readonly pantryService : PantryService,
                    private readonly accountService : AccountService,
                ) {}

    // Get all product
    async getAllProduct(filter : any = {}): Promise<any>{
        const products = await this.productRepository.find(filter);
        return products;
    }

    // get by id
    async getByID(product_id : string): Promise<any>{
        const products = await this.productRepository.findOne({where : { product_id : product_id }});
        return products;
    }

    // get by name products
    async getByName(name : string) : Promise<any>{
        return this.productRepository.findOne({where : {name : name}});
    }

    // get by product_id
    async getByProduct_id(product_id : string) : Promise<any>{
        return this.productRepository.findOne({where : {product_id : product_id}});
    }

    // create product
    // async createProduct(data : BodyProductCreate) : Promise<any>{
    //    try {
    //        // check name exists
    //        const isProductExists = await this.getByName(data.name);
    //        if(isProductExists){
    //            throw new HttpException('The product already in use',HttpStatus.CONFLICT);
    //        }
    //
    //        // create
    //        //  return await query(`SELECT products.* , SUM(history.quantity) AS quantity, measurement
    //        //                  From products
    //        //                  LEFT JOIN history
    //        //                  ON products.product_id = history.created_by`);
    //        const category = await this.categoryService.getById(data.categories);
    //        const pantry = await this.pantryService.getByID(data.pantry);
    //        const account = await this.accountService.getAccountById(data.account);
    //
    //        const productsEntity = new ProductsEntity();
    //        productsEntity.image = data.image;
    //        productsEntity.name = data.name;
    //        productsEntity.date = new Date();
    //        productsEntity.total = data.total;
    //        productsEntity.is_active = data.is_active;
    //        productsEntity.state_used = data.state_used;
    //        productsEntity.categories = category;
    //        productsEntity.pantry = pantry;
    //        productsEntity.account = account;
    //
    //        const result = await this.productRepository.save(productsEntity);
    //        return result;
    //    }catch (err){
    //        console.log('errors',err);
    //        throw new HttpException('The product cannot create',HttpStatus.INTERNAL_SERVER_ERROR);
    //    }
    // }

    async createProduct(data : BodyProductCreate, history? : ProductsEntity[]) : Promise<any>{
        try {
            // check name exists
            const isProductExists = await this.getByName(data.name);
            if(isProductExists){
                throw new HttpException('The product already in use',HttpStatus.CONFLICT);
            }

            // create
           // const productWithProductHistory = await dataSource
           //     // .getRepository(ProductsEntity)
           //     .createQueryBuilder()
           //     .select('products.*,SUM(history.quantity) AS quantity, measurement')
           //     .from(ProductsEntity,'products')
           //     .leftJoinAndSelect('products.history','history')
           //     .where('products.product_id = history.created_by')
           //     .andWhere('')
           //     .getMany();


            // const listProductQueryBuilder = this.productRepository.createQueryBuilder('products')
            //     .leftJoinAndSelect('products.history', 'history','history.created_by = products.products_id')
            //     .select('p.*, sum(h.quantity) as quantity')
            //     .from(ProductsEntity,'products')
            //     .where('')
            //
            //
            //
            //     for(let i = 0; i < history.length ; i++){
            //         if(listProductQueryBuilder.){
            //
            //         }
            //     }

            const listProductQueryBuilder  = this.productRepository.createQueryBuilder()
                .select('p.*,sum(h.quantity) as quantity,h.measurement')
                .from(ProductsEntity,'p')
                .leftJoinAndSelect(ProductHistoryEntity,'h','p.products_id = h.created_by')
                .groupBy('p.products_id')

                for(let i = 0; i < history.length ; i++){
                    // if(listProductQueryBuilder[i].history){
                    //     listProductQueryBuilder[i].history = listProductQueryBuilder[i].total
                    // }

                    const a = history[i].history;
                    if(a){
                        listProductQueryBuilder[i].history = listProductQueryBuilder[i].total;
                    }
                }

                const result = await listProductQueryBuilder.getRawMany();
                return  result;




                // .getRepository(ProductsEntity)
                // .createQueryBuilder('products')
                // .leftJoinAndSelect('products.history','history')
                // .getMany();

            // const category = await this.categoryService.getById(data.categories);
            // const pantry = await this.pantryService.getByID(data.pantry);
            // const account = await this.accountService.getAccountById(data.account);
            //
            // const productsEntity = new ProductsEntity();
            // productsEntity.image = data.image;
            // productsEntity.name = data.name;
            // productsEntity.date = new Date();
            // productsEntity.total = data.total;
            // productsEntity.is_active = data.is_active;
            // productsEntity.state_used = data.state_used;
            // productsEntity.categories = category;
            // productsEntity.pantry = pantry;
            // productsEntity.account = account;
            //
            // const result = await this.productRepository.save(productsEntity);
            // return result;
        }catch (err){
            console.log('errors',err);
            throw new HttpException('The product cannot create',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // update Product
    async updateProduct(product_id : string, data : Partial<BodyProductUpdate>): Promise<any>{
       try {
           // check product exists
           const product = await this.productRepository.findOne({ where : { product_id : product_id}});
           if(!product){
               throw new HttpException('The product is not found',HttpStatus.NOT_FOUND);
           }

           // update
           const productsEntity = new ProductsEntity();
           productsEntity.image = data.image;
           productsEntity.name = data.name;
           productsEntity.date = new Date();
           productsEntity.total = data.total;
           productsEntity.is_active = data.is_active;
           productsEntity.state_used = data.state_used;

           const result = await this.productRepository.update(product_id,productsEntity);
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The product cannot update',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // delete product
    async deleteProduct(product_id : string): Promise<any>{
       try {
           // check product exists
           const product = await this.productRepository.findOne({ where : { product_id : product_id}});
           if(!product){
               throw new HttpException('The product is not found',HttpStatus.NOT_FOUND);
           }

           // delete
           const result = await this.productRepository.delete(product_id);
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The product is not found',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}