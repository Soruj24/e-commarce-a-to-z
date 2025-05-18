import express from 'express';
import { handelCreateProducts, handelDeleteProducts, handelGetProduct, handelGetProducts, handelUpdateProducts } from '../controllers/productControllers';

const productRouter = express.Router();

// GET all products with search, sort, pagination
productRouter.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        await handelGetProducts(req, res, next);
    } catch (error) {
        next(error);
    }
});

// GET single product by ID
productRouter.get('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        await handelGetProduct(req, res, next);
    } catch (error) {
        next(error);
    }
});

// POST create new product
productRouter.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        await handelCreateProducts(req, res, next);
    } catch (error) {
        next(error);
    }
});

// PUT update product by ID
productRouter.put('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        await handelUpdateProducts(req, res, next);
    } catch (error) {
        next(error);
    }
});

// DELETE product by ID
productRouter.delete('/:id', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        await handelDeleteProducts(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default productRouter;