import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Account} from "./account.entity";
import {Repository} from "typeorm";
import {BodyCreateAccount, BodyUpdateAccount} from "./account.dto";
import {RoleService} from "../role/role.service";
import {BodyRegister} from "../auth/auth.dto";
import {v4 as uuidv4} from 'uuid';
import * as bcrypt from 'bcryptjs'
import {hashSync} from 'bcryptjs'
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
    async createAccount(data: BodyCreateAccount, hostname: string): Promise<any> {
        try {
            // check username exists
            const isAccountExists = await this.getByUsername(data.username);
            if (isAccountExists)
                throw new HttpException('The account already in use', HttpStatus.CONFLICT);

            //check role valid
            const role = await this.roleService.findById(data.role);
            // if (!role || role.id === 2) {
            //     throw new HttpException('Role is incorrect', HttpStatus.NOT_FOUND);
            // }

            // create account
            const accountEntity = new Account();
            accountEntity.username = data.username;
            accountEntity.password = hashSync(data.password, 6);
            accountEntity.fullname = data.fullname;
            accountEntity.gioitinh = data.gioitinh;
            accountEntity.phone = data.phone;
            accountEntity.role = role;
            accountEntity.verify_token = uuidv4();
            accountEntity.allow_email = data.allow_email;

            const url = `${hostname}/auth/verify/${accountEntity.verify_token}`
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

            const account = await this.accountRepository.save(accountEntity);
            return account;
        }catch(err){
            console.log('errors', err);
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
            const role = await this.roleService.findById(data.role);

            const accountEntity = new Account();
            accountEntity.username = data.username;
            accountEntity.password = hashSync(data.password, 6);
            accountEntity.fullname = data.fullname;
            accountEntity.gioitinh = data.gioitinh;
            accountEntity.phone = data.phone;
            accountEntity.role = role;
            accountEntity.verify_token = uuidv4();
            accountEntity.allow_email = data.allow_email;

            const result = await this.accountRepository.save(accountEntity);


            const url = `${hostname}/auth/verify/${accountEntity.verify_token}`
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
           const account = await this.accountRepository.findOne({where : {account_id : account_id}});
           if (!account)
               throw new HttpException('The account is not found', HttpStatus.NOT_FOUND);

           //check role valid
           const role = await this.roleService.findById(data.role);
               if (!role || role.id === 2) {
                   throw new HttpException('Role is incorrect', HttpStatus.NOT_FOUND);
               }


           // update account
           const accountEntity = new Account();
           accountEntity.username = data.username;
           if(data.password){
               accountEntity.password = hashSync(data.password, 6);
           }
           accountEntity.fullname = data.fullname;
           accountEntity.gioitinh = data.gioitinh;
           accountEntity.phone = data.phone;
           accountEntity.role = role;
           accountEntity.is_active = data.is_active;
           accountEntity.allow_email = data.allow_email;

           const result = await this.accountRepository.update(account_id, accountEntity);
           return result;
       }catch (err){
           console.log('error',err);
           throw new HttpException('The account cannot update',HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    async updateActiveAccount(account_id : string, data: Partial<BodyUpdateAccount>): Promise<any> {
        try {
            // check account exists
            const account = await this.accountRepository.findOne({where : {account_id : account_id}});
            if (!account)
                throw new HttpException('The account is not found', HttpStatus.NOT_FOUND);

            // update account
            const accountEntity = new Account();
            accountEntity.is_active = data.is_active;

            const result = await this.accountRepository.update(account_id, accountEntity);
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