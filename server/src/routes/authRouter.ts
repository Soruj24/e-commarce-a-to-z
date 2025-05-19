import express, { Request, Response, NextFunction } from 'express';
import { handelLogIn } from '../controllers/authController';

const authRouter = express.Router();


authRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    await handelLogIn(req, res, next);
});

export default authRouter;