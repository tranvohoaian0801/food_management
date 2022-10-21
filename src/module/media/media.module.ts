import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MediaEntity} from "./media.entity";
import {LocalFilesService} from "./media.localFileService";

@Module({
    imports : [TypeOrmModule.forFeature([MediaEntity])],
    providers : [LocalFilesService],
    exports : [TypeOrmModule,LocalFilesService]
})
export class MediaModule {}