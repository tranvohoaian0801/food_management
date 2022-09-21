import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Account} from "./account.entity";
import {Repository} from "typeorm";
import {BodyCreateAccount, BodyUpdateAccount} from "./account.dto";
import {RoleService} from "../role/role.service";
import {BodyRegister} from "../auth/auth.dto";
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcryptjs'
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class AccountService {
    constructor(@InjectRepository(Account) private readonly accountRepository: Repository<Account>,
                private readonly roleService: RoleService,
                private readonly mailerService: MailerService) {
    }

    // Find All
    async getAllAccounts(filter: any = {}): Promise<any> {
        const accounts = await this.accountRepository.find(filter);
        return accounts.map((account) => {
            delete account.password;
            return account;
        })
        // return await this.accountRepository.find();
    }

    // find by id
    async getAccountById(account_id : string): Promise<Account> {
        const accounts = await this.accountRepository.findOne({where : {account_id :account_id}});
        delete accounts.password;
        return accounts;
    }

    // find by username
    async getByUsername(username: string): Promise<any> {
        return this.accountRepository.findOne({where: {username: username}});
    }

    // find verifyToken
    async getByVerifyToken(token : string) : Promise<Account>{
        return this.accountRepository.findOne({where : {verify_token : token}});
    }

    // find username and role
    async findByUsernameAndSelectRole(username : string) : Promise<Account>{
        return this.accountRepository.findOne({
            where : {username : username},
            relations :['role'],
        })
    }

    // create account
    async createAccount(data: BodyCreateAccount): Promise<any> {
        try {
            // check username exists
            const isAccountExists = await this.getAccountById(data.username);
            if (isAccountExists)
                throw new HttpException('The account already in use', HttpStatus.CONFLICT);

            //check role valid
            const isrole = await this.roleService.findById(data.role);
            if (!isrole || isrole.id === 1) {
                throw new HttpException('Role is incorrect', HttpStatus.NOT_FOUND);
            }

            // create account
            data.is_active = true;
            data.password = bcrypt.hashSync(data.password, 6);
            data.verify_token = uuidv4();
            const account = await this.accountRepository.save(data);
            return account;
        }catch(err){
            console.log('error', err);
            throw new HttpException('The account cannot create', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // create register
    async register(data: BodyRegister, hostname: string): Promise<any> {
        try {
            // check username exists
            const username = await this.getByUsername(data.username);
            if (username) {
                throw new HttpException('The account already in use', HttpStatus.CONFLICT);
            }

            // create
            data.password = bcrypt.hashSync(data.password, 6);
            data.verify_token = uuidv4();

            const result = await this.accountRepository.save(data);

            const url = `${hostname}/auth/verify/${data.verify_token}`
            this.mailerService.sendMail({
                from: '"Support Team" <tranvohoaian2k@gmail.com>',
                to: data.username,
                subject: 'Welcome to Food management App! Confirm your Email',
                template: './gmail', // `.hbs` extension is appended automatically
                context: {
                    fullname : data.fullname,
                    url
                }
            })

            // const result = await this.accountRepository
            //     .save(data)
            //     .then((resolve) => {
            //         const url = `${hostname}/auth/verify/${data.verify_token}`
            //         this.mailerService.sendMail({
            //             from: '"Support Team" <tranvohoaian2k@gmail.com>',
            //             to: data.username,
            //             subject: 'Welcome to Food management App! Confirm your Email',
            //             template: './gmail', // `.hbs` extension is appended automatically
            //             context: {
            //                 fullname : data.fullname,
            //                 url
            //             }
            //         })
            //     })
            return result;
        }catch (err){
            console.log('error',err);
            throw new HttpException('The account cannot create', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    // update Account
    async updateAccount(account_id : string, data: Partial<BodyUpdateAccount>): Promise<any> {
       try {
           // check account exists
           const Account = await this.accountRepository.findOne({where : {account_id : account_id}});
           if (!Account)
               throw new HttpException('The account is not found', HttpStatus.NOT_FOUND);

           //check role valid
           if (data.role) {
               const thisRole = await this.roleService.findById(data.role);
               if (!thisRole || thisRole.id === 1) {
                   throw new HttpException('Role is incorrect', HttpStatus.NOT_FOUND);
               }
           }

           // update account
           const result = await this.accountRepository.update(account_id, data);
           return result;
       }catch (err){
           console.log('error',err);
           throw new HttpException('The account cannot update',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    // delete Acount
    async deleteAccount(account_id : string): Promise<any> {
        try {
            // check account exists
            const Account = await this.accountRepository.findOne({where : {account_id : account_id}});
            if (!Account)
                throw new HttpException('The account is not found', HttpStatus.NOT_FOUND);

            // delete
            const result = await this.accountRepository.delete(account_id);
            return result;
        }catch (err){
            console.log('errors',err);
            throw new HttpException('The account cannot delete ', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}