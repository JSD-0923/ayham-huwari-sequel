import { Application } from 'express';
import { create, findAll, findOne, Update, Delete} from '../controllers/books.controller';

export default (app: Application): void => {
    const router = require('express').Router();

    router.post("/", create);

    router.get("/", findAll);
    router.get("/:id", findOne);
    router.put("/:id", Update);
    router.delete("/:id", Delete);
    app.use('/api/books', router);
};


