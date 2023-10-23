import { Dialect, Sequelize } from 'sequelize';
import { bookConfig } from '../config/db.config';
import bookModel from './books.model';

const sequelize = new Sequelize(bookConfig.DB, bookConfig.USER, bookConfig.PASSWORD, {
    host: bookConfig.HOST,
    dialect: bookConfig.DIALECT as Dialect,
    pool: {
        max: bookConfig.pool.max,
        min: bookConfig.pool.min,
        acquire: bookConfig.pool.acquire,
        idle: bookConfig.pool.idle
    }
});

const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.books = bookModel(sequelize);

export default db;
