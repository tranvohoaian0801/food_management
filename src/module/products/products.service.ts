import {HttpException, HttpStatus, Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ProductsEntity} from "./products.entity";
import {Repository} from "typeorm";
import {BodyProductCreate, BodyProductUpdate} from "./products.dto";
import {RoleService} from "../role/role.service";
import {CategoriesService} from "../categories/categories.service";
import {PantryService} from "../pantry_management/pantry.service";
import {AccountService} from "../account/account.service";
import {Cron} from "@nestjs/schedule";
import {MailerService} from "@nestjs-modules/mailer";
import * as moment from "moment";
import {MediaDto} from "../media/media.dto";
import {LocalFilesService} from "../media/media.localFileService";


@Injectable()
export class ProductsService{
    constructor(@InjectRepository(ProductsEntity) private productRepository : Repository<ProductsEntity>,
                    private readonly roleService : RoleService,
                    private readonly categoryService : CategoriesService,
                    private readonly pantryService : PantryService,
                    private readonly accountService : AccountService,
                    private readonly mailerService : MailerService,
                    private readonly localFileService : LocalFilesService,
                ) {}

    private readonly logger = new Logger(ProductsService.name);

    // scheduler cron job
    // @Cron('10 * * * * * ',{
    //     name : 'notifications',
    // })
    // async scheduleEmailProduct() : Promise<any>{
    //     try {
    //         const listProduct = this.productRepository.createQueryBuilder('p')
    //             .leftJoinAndSelect('p.history', 'h')
    //             .leftJoinAndSelect('p.categories','c')
    //             .leftJoinAndSelect('p.account','a')
    //         const result = await listProduct.getMany();
    //
    //         for(let i = 0; i < result.length; i++){
    //             const resultDate = moment().diff(moment(result[i].date)) / 1000;
    //             if(resultDate >= Number(result[i].categories.time_notify)){
    //                 if(result[i].is_active == true){
    //                     const url = `http://localhost:3000/product/confirm/${result[i].product_id}`
    //                     this.mailerService.sendMail({
    //                         from: '"Support Team" <tranvohoaian2k@gmail.com>',
    //                         to: result[i].account.username,
    //                         subject: 'Welcome to Food management App! Confirm your Email',
    //                         template: './schedulerEmail', // `.hbs` extension is appended automatically
    //                         context: {
    //                             fullname : result[i].account.fullname,
    //                             nameProduct : result[i].name,
    //                             url
    //                         }
    //                     })
    //                 }
    //             }
    //         }
    //         this.logger.debug('send gmail success');
    //     }catch (err){
    //         console.log('errors', err);
    //         throw new HttpException('Cron jobs scheduler failed',HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }




    @Cron('* */30 * * * * ',{
        name : 'notifications',
    })
    async scheduleEmailProduct() : Promise<any>{
        try {
            const listProduct = this.productRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.history', 'h')
                .leftJoinAndSelect('p.categories','c')
                .leftJoinAndSelect('p.account','a')
            const result = await listProduct.getMany();

            for(let i = 0; i < result.length; i++){
                const resultDate = moment().diff(moment(result[i].date)) / 1000;
                if(resultDate >= Number(result[i].categories.time_notify)){
                    if(result[i].is_active == true){
                        let data = [{
                            product_id : result[i].product_id,
                            is_active : result[i].is_active,
                            state_used : result[i].state_used,
                        }]
                        const rawString = JSON.stringify(data)
                        const encoded = Buffer.from(rawString, 'utf8').toString('base64')
                        const url = `http://localhost:3000/auth/confirm/${encoded}`
                        this.mailerService.sendMail({
                            from: '"Support Team" <tranvohoaian2k@gmail.com>',
                            to: result[i].account.username,
                            subject: 'Welcome to Food management App! Confirm your Email',
                            template: './schedulerEmail', // `.hbs` extension is appended automatically
                            context: {
                                fullname : result[i].account.fullname,
                                nameProduct : result[i].name,
                                url
                            }
                        })
                    }
                }
            }
            this.logger.debug('send gmail success');
        }catch (err){
            console.log('errors', err);
            throw new HttpException('Cron jobs scheduler failed',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // get all products
    async getProducts(name? : string) : Promise<ProductsEntity[]>{
       try {
           const listProduct = this.productRepository.createQueryBuilder('p')
               .leftJoinAndSelect('p.history', 'h')
           const result = await listProduct.getMany();

           for(let i = 0; i < result.length ; i++){
               if(result[i].history){
                   let totalQuantity = '';
                   result[i].history.map(item => {
                       totalQuantity += item.quantity
                   })
                   result[i].total = Number(totalQuantity)
               }
           }
           const resultListProduct = this.productRepository.save(result);
           return resultListProduct;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('failed',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }


    // get by id
    async getByID(product_id : string): Promise<any>{
        const result = this.productRepository.findOne({where :{product_id :product_id}});
        return result;
    }

    // get by name products
    async getByName(name : string) : Promise<any>{
        try {
            return this.productRepository.findOne({where : {name : name}});

            const listProduct = this.productRepository.createQueryBuilder('p')
                .leftJoinAndSelect('p.history', 'h')
                .where('p.name = :name',{name : name})
            const result = await listProduct.getMany();
            return  result;
        }catch (err){
            console.log('errors',err);
        }
    }

    // tim file
    // async getFileByImage(image : string) : Promise<any>{
    //     const file = await this.productRepository.findOne({where : {image : image}});
    //     if(!file){
    //         throw new NotFoundException();
    //     }
    //     return file;
    // }


    // luu file vao local
    // async saveLocalFileData(fileData : BodyUploadFileProduct) :Promise<any>{
    //     const newFile = await this.productRepository.create(fileData);
    //     await this.productRepository.save(newFile);
    //     return newFile;
    // }

    // add file
    // async addFileProduct(product_id : string, fileData : BodyUploadFileProduct):Promise<any>{
    //     const fileProduct = await this.saveLocalFileData(fileData);
    //     await this.productRepository.update({product_id :product_id},{
    //         image :  fileProduct.product_id,
    //     })
    // }


    // create product
    async createProduct(data : BodyProductCreate) : Promise<any>{
        try {
            // check name exists
            const isProductExists = await this.getByName(data.name);
            if(isProductExists){
                throw new HttpException('The product already in use',HttpStatus.CONFLICT);
            }

            // const images = await this.getFileByImage(data.image);
            // const fileProduct = await this.saveLocalFileData(data);

            // create
            const category = await this.categoryService.getById(data.categories);
            const pantry = await this.pantryService.getByID(data.pantry);
            const account = await this.accountService.getAccountById(data.account);

            const productsEntity = new ProductsEntity();
            // productsEntity.image = data.image;
            productsEntity.name = data.name;
            productsEntity.date = new Date().toISOString();
            productsEntity.total = data.total;
            productsEntity.is_active = data.is_active;
            productsEntity.state_used = data.state_used;
            productsEntity.categories = category;
            productsEntity.pantry = pantry;
            productsEntity.account = account;

            const result = await this.productRepository.save(productsEntity);
            return result;
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
           const category = await this.categoryService.getById(data.categories);
           const pantry = await this.pantryService.getByID(data.pantry);
           const account = await this.accountService.getAccountById(data.account);

           const productsEntity = new ProductsEntity();
           // productsEntity.image = data.image;
           productsEntity.name = data.name;
           productsEntity.date = new Date().toISOString();
           productsEntity.total = data.total;
           productsEntity.is_active = data.is_active;
           productsEntity.state_used = data.state_used;
           productsEntity.categories = category;
           productsEntity.pantry = pantry;
           productsEntity.account = account;

           const result = await this.productRepository.update(product_id,productsEntity);
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The product cannot update',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }


    // update trạng thái product after send gmail
    async updateActiveProduct(product_id : string, data : Partial<BodyProductUpdate>): Promise<any>{
        try {
            // check product exists
            const product = await this.productRepository.findOne({ where : { product_id : product_id}});
            if(!product){
                throw new HttpException('The product is not found',HttpStatus.NOT_FOUND);
            }

            // update
            const productsEntity = new ProductsEntity();
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
           const result = await this.productRepository.delete({product_id : product_id});
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The product is not found',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }


    // confirm product
    async confirmProduct( encode : string) : Promise<any>{
        try {
            const decode = Buffer.from(encode,'base64').toString();
            let base64Data = JSON.parse(decode);
            for(let i = 0 ; i < base64Data.length ; i++){
                if(base64Data[i].product_id){
                    const result =  await this.updateActiveProduct(base64Data[i].product_id, {
                        is_active : false,
                        state_used : "used_up",
                    })
                    return result;
                }
            }
        }catch (err){
            console.log('errors',err);
            throw new HttpException('Confirm isActive product failed',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // update image
   // async fileUpload(img: BodyUploadFileProduct) : Promise<any>{
   //     var form = new FormData();
   //     form.append('image', img)
   //
   //     var url = 'https://api.imgbb.com/1/upload?key=8d5867a9512390fb5e5dc97839aa36f6'
   //
   //     const config = {
   //         method: 'POST',
   //         headers: {
   //             'Accept': 'application/json',
   //             'Access-Control-Allow-Origin': '*',
   //             'Connection': 'keep-alive',
   //             'Content-Type': 'application/json',
   //         },
   //         body: form
   //     }
   //
   //     const response = await fetch(url, config)
   //     const json = await response.json()
   //
   //     console.log(response)
   // }


    async addFileProduct(product_id : string, data : MediaDto) : Promise<any>{
        try {
            const avatar = await this.localFileService.saveLocalFileData(data);
            const result = await this.productRepository.update({product_id :product_id},{
                image : avatar.id,
            })
            return result;
        }catch (err){
            console.log("Errors",err)
            throw new HttpException('upload failed',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}