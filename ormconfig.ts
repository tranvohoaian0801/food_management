require("dotenv").config({ path: "./env/.dev.env" })
import {DataSource} from 'typeorm'

// host chạy local thì là localhost
// chay container thi la ten cua service container
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize : false,
  logging : false,
  entities: ['src/module/**/*.entity.ts'],
  migrations: ['src/migration/*.ts'],
})

export default dataSource


