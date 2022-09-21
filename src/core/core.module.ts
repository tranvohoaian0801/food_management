import {Module} from "@nestjs/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../config/configuration";
import {TypeOrmModule} from "@nestjs/typeorm";
import {string} from "joi";
import {join} from "path";
import {MailerModule} from "@nestjs-modules/mailer";
import {HandlebarsAdapter} from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

const NODE_ENV = process.env.NODE_ENV;
@Module({
    imports :[
        ConfigModule.forRoot({
            envFilePath : `./env/${NODE_ENV ? '.' + NODE_ENV.trim() : ''}.env`,
            isGlobal : true,
            load : [configuration]
        }),
        TypeOrmModule.forRootAsync({
            imports : [ConfigModule],
            inject : [ConfigService],
            useFactory :async (configService : ConfigService) => ({
                type : 'postgres',
                host : configService.get<string>('database.host'),
                port : configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.db_name'),
                autoLoadEntities: true,
                // synchronize : true,
            }),
        }),

        // config gmail
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                transport: {
                    service: 'gmail',
                    host: 'smtp.gmail.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: configService.get<string>('mail.account'),
                        pass: configService.get<string>('mail.password')
                    }
                },
                defaults: {
                    from: configService.get<string>('mail.account')
                },
                template: {
                    dir: join(__dirname, '../../../src/helpers/template/mail'),
                    adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
                    options: {
                        strict: true
                    }
                }
            })
        })
    ],
    exports : [ConfigModule,TypeOrmModule,MailerModule]
})
export class CoreModule{}