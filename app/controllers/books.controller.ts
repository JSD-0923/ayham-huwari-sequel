import { Request, Response } from 'express';
import { Op } from 'sequelize';
import db from '../models';

const Book = db.books;

export const create = (req: Request, res: Response): void => {
    
    if (!req.body.book_name) {
        res.status(400).send({
            message: "content can not be empty"
        });
        return;
    }

    const book = {
        book_name: req.body.book_name,
        author: req.body.author,
        published_year: req.body.published_year,
        gener: req.body.gener,
        description: req.body.description,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    Book.create(book)
        .then(data => {
            console.log("done");
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "some error occurred while creating a book"
            });
        });
};

export const findAll = (req: Request, res: Response):void => {
    
    const name = req.query.book_name;
    //check if the value of name is a truthy(string, number, object etc) or falsy (null, 0, undefined, false or empty string)
    var condition = name ? {name: {[Op.like]: '%${title}%'}}:null
/*const name = req.query.book_name; extracts the book_name parameter from the query string. Since there is no book_name parameter in the URL (http://localhost:3000/api/books/), name will be undefined.

var condition = name ? {name: {[Op.like]: '%${title}%'}} : null; checks if name is truthy. In this case, name is undefined, which is falsy. Therefore, condition will be null.

Book.findAll({where: condition}) queries the database using condition, which is null in this case. When where is null, Sequelize retrieves all records from the database without applying any specific conditions.

The response will include all books from the database because no specific filtering condition is applied due to the absence of the book_name parameter in the URL.*/
    Book.findAll({where: condition})
    .then(data =>{
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "error in retrieving"
        })
    })
};

export const findOne = (req: Request, res: Response):void => {
    
    const id = parseInt(req.params.id as string, 10);

    Book.findByPk(id)
    .then(data =>{
        res.send({data})
    })
    .catch(err =>{
        message:
        err.message || "error retriving specific book"
    })
}

export const Update = (req: Request, res: Response):void => {
    
    
    const id = parseInt(req.params.id as string, 10);
    
    Book.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num[0] === 1) {
            res.send({
                message: "Updated successfully"
            });
        } else {
            res.send({
                message: "Error updating"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error updating specific book"
        });
    });
};


export const Delete = (req: Request, res: Response):void => {
    
    const id = parseInt(req.params.id as string, 10);

    Book.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num === 1) {
            res.send({
                message: "Deleted successfully"
            });
        } else if (num === 0) {
            res.status(404).send({
                message: "Book not found"
            });
        } else {
            res.status(500).send({
                message: `Error deleting book with id ${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error deleting specific book"
        });
    });
};

