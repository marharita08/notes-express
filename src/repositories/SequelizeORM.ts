const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USER!, process.env.DB_PASSWORD!,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT)
    });

export default sequelize;
