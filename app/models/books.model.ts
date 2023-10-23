import { DataTypes, Sequelize } from 'sequelize';

const bookModel = (sequelize: Sequelize) => {
    const Book = sequelize.define('book', {
        book_name: {
            type: DataTypes.STRING
        },
        author: {
            type: DataTypes.STRING
        },
        published_year: {
            type: DataTypes.INTEGER
        },
        gener: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        }
    });
    return Book;
};

export default bookModel;
