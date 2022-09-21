import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {CategoriesEntity} from "./categories.entity";
import {EntityManager, Repository} from "typeorm";
import {BodyCreateCate, BodyUpdateCate} from "./categories.dto";
import {RoleService} from "../role/role.service";
import {rejects} from "assert";
import {AccountService} from "../account/account.service";

@Injectable()
export class CategoriesService{
    constructor(@InjectRepository(CategoriesEntity) private readonly cateRepository : Repository<CategoriesEntity>
    ,private readonly roleService : RoleService,
                private readonly accountService : AccountService) {}

    // find all
    async getAllCategories(filter : any = {}) : Promise<any>{
        const category = await this.cateRepository.find(filter);
        return category;
    }

    // find by id
    async getById(cate_id : string) : Promise<any>{
        const categories = await this.cateRepository.findOne({where : {cate_id : cate_id}});
        return categories;
    }

    // find by name
    async findByName(cate_name : string) : Promise<any>{
        return this.cateRepository.findOne({where : {cate_name : cate_name}});
    }

    // create categories
    async createCategories( data : BodyCreateCate, account_id : string) : Promise<any>{
     try {
         // check name exists
         const isCategoryExists = await this.findByName(data.cate_name);
         if (isCategoryExists) {
             throw new HttpException('The category already in use', HttpStatus.CONFLICT)
         }

         /// tìm account Id gán nó vào . rồi truyền vào save ()
         const account  = await this.accountService.getAccountById(account_id);

         const category = new CategoriesEntity();
         category.cate_name = data.cate_name;
         category.time_notify = data.time_notify;
         category.used_time = data.used_time;
         category.priority = data.priority;
         category.account = account;

         // create Categories
         const result = await this.cateRepository.save(category);
         return result;
     }catch (err){
         console.log('errors',err);
         throw new HttpException('The categories cannot create',HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }

    // update Categories
    async updateCategories(cate_id : string, data : Partial<BodyUpdateCate>) : Promise<any>{
      try {
          // check cate exists
          const categories = await this.cateRepository.findOne({where : { cate_id : cate_id }});
          if(!categories){
              throw new HttpException('The categories is not found',HttpStatus.NOT_FOUND);
          }

          const category = new CategoriesEntity();
          category.cate_name = data.cate_name;
          category.time_notify = data.time_notify;
          category.used_time = data.used_time;
          category.priority = data.priority;

          const result =  await this.cateRepository.update({cate_id: cate_id},category);
          return result;
      }catch (err){
          console.log('errors',err);
          throw new HttpException('The categories cannot update',HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    // delete Categories
    async deleteCategories(cate_id : string) : Promise<any>{
     try {
         // check categories exists
         const categories = await this.cateRepository.findOne({where : { cate_id : cate_id }});
         if(!categories){
             throw new HttpException('The categories is not found', HttpStatus.NOT_FOUND);
         }

         // delete
         const result =  await this.cateRepository.delete(cate_id);
         return result;
     }catch (err){
         console.log('errors',err);
         throw new HttpException('The categories cannot delete ', HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }
}