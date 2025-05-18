import { Router } from 'express';
import { seedCategoriesAdd, seedProductsAdd, seedUserAdd } from '../controllers/seedController';

const seedRouter = Router();


seedRouter.get('/', seedUserAdd);
seedRouter.get('/products', seedProductsAdd);
seedRouter.get('/categories', async (req, res, next) => {
    try {
        await seedCategoriesAdd(req, res, next);
    } catch (error) {
        next(error);
    }
});

export default seedRouter;