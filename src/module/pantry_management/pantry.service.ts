import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {PantryEntity} from "./pantry.entity";
import {Repository} from "typeorm";
import {BodyCreatePantry} from "./pantry.dto";
import {rejects} from "assert";

@Injectable()
export class PantryService{
    constructor(@InjectRepository(PantryEntity) private pantryReposity : Repository<PantryEntity>) {}

    // Get all Pantry
    async getAll(filter : any = {}) : Promise<any>{
        const pantrys = await this.pantryReposity.find(filter);
        return pantrys;
     }

     // get By Id
    async getByID(pantry_id : string) : Promise<any>{
        return this.pantryReposity.findOne({where: {pantry_id: pantry_id}});
    }

    // get by name
    async getByName(storage_place : string) : Promise<any>{
        return this.pantryReposity.findOne({where : {storage_place : storage_place}});
    }

    // create Pantry
    async createPantry(data : BodyCreatePantry) : Promise<any>{
       try {
           // check pantry_id exists
           const isNamePantry = await this.getByName(data.storage_place);
           if(isNamePantry){
               throw new HttpException('The pantry already in use',HttpStatus.CONFLICT);
           }

           // create
           const result = await this.pantryReposity.save(data);
           return result;
       }catch (err){
           console.log('errors',err);
           throw new HttpException('The pantry cannot create',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // delete pantry
    async deletePantry(pantry_id : string): Promise<any>{
       try {
           const pantry = await this.pantryReposity.findOne({where : { pantry_id:pantry_id } } );
           if(!pantry){
               throw new HttpException('The pantry is not found',HttpStatus.NOT_FOUND);
           }

           // delete
           const result = await this.pantryReposity.delete(pantry_id);
           return result;
       }catch (err){
            console.log('errors',err);
           throw new HttpException('The pantry cannot delete',HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}