import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { handelCreateCategory, handelDeleteCategory, handelGetAllCategory, handelGetCategory, handelUpdateCategory } from '../controllers/categoryControllers';
const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await handelGetAllCategory(req, res, next);
});

categoriesRouter.get('/:slug', async (req: Request, res: Response, next: NextFunction) => {
    await handelGetCategory(req, res, next);
});

categoriesRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await handelCreateCategory(req, res, next);
});
categoriesRouter.put('/:slug', async (req: Request, res: Response, next: NextFunction) => {
    await handelUpdateCategory(req, res, next);
});

categoriesRouter.delete('/:slug', async (req: Request, res: Response, next: NextFunction) => {
    await handelDeleteCategory(req, res, next);
})

export default categoriesRouter