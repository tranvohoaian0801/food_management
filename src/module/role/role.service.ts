import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {RoleEntity} from "./role.entity";
import {In, Repository} from "typeorm";
import {RoleAsObject, RoleIds} from "../../constant/role/role.constant";

@Injectable()
export class RoleService{
    constructor(@InjectRepository(RoleEntity) private roleRepository : Repository<RoleEntity>) {}

    // get all Role
    async getAllRole():Promise<RoleEntity[]> {
        return this.roleRepository.find();
    }

    async findById(id : number): Promise<RoleEntity> {
        return this.roleRepository.findOne({where : { id : id }});
    }

    // async findRoleInUse(fullname : string) :Promise<RoleEntity>{
    //     return this.roleRepository.findOne({where : {fullname : fullname}});
    // }

    // async onModuleInit(){
    //   try {
    //       if (RoleIds.length){
    //           const existsRoles = await this.roleRepository.find({
    //               where : {
    //                   id : In(RoleIds),
    //               }
    //           })
    //
    //           if(existsRoles.length < RoleIds.length){
    //               const existedIds = existsRoles.map((e)=>e.id);
    //               const lackingIds = RoleIds.filter((e)=> !existedIds.includes(e));
    //               const lackingRoles = Object.entries(RoleAsObject)
    //                   .filter((e : any)=> lackingIds.includes(e[1]))
    //                   .map((e)=>{
    //                       return {
    //                           id : e[1],
    //                           name : e[0],
    //                       }
    //                   })
    //
    //               if(lackingRoles.length){
    //                   await this.roleRepository.insert(<any>lackingRoles);
    //               }
    //           }
    //       }
    //   }catch (err){
    //       console.log('errors',err);
    //   }
    // }
}