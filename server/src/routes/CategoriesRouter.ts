import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { handelGetAllCategory } from '../controllers/categoryControllers';
const categoriesRouter = express.Router();

  categoriesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await handelGetAllCategory(req, res, next);
});

export default categoriesRouter