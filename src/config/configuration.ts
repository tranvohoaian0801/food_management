export default () => {
    return {
        node_env: process.env.NODE_ENV || 'local',
        port: parseInt(process.env.APP_PORT, 10) || 3000,
        // timezone: process.env.TIMEZONE || 'America/New_York',
        // log_file_path: process.env.LOG_FILE_PATH || 'logs/combined.log',
        database: {
            type: process.env.POSTGRES_TYPE || 'postgres',
            host: process.env.POSTGRES_HOST || 'localhost',
            port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            db_name: process.env.POSTGRES_NAME || 'food-management-DB'
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'secret_key',
            expires_in: process.env.JWT_EXPIRES_IN || '3h'
        },
        mail: {
            // The account just for testing 😉😉
            account: process.env.MAIL_ACCOUNT || 'tranvohoaian2k@gmail.com',
            password: process.env.MAIL_PASSWORD || 'Hoaian2002'
        }
    }
}