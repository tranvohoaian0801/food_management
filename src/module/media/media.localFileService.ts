import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MediaEntity} from "./media.entity";
import {Repository} from "typeorm";
import {MediaDto} from "./media.dto";

@Injectable()
export class LocalFilesService {
    constructor(
        @InjectRepository(MediaEntity)
        private localFilesRepository: Repository<MediaEntity>,
    ) {}

    async saveLocalFileData( data: MediaDto) {
       try{
           const newFile = await this.localFilesRepository.create(data)
           await this.localFilesRepository.save(newFile);
           return newFile;

       }catch (err){
           console.log('Errors', err);
           throw new HttpException('Save local failed',HttpStatus.INTERNAL_SERVER_ERROR);
       }

    }
}