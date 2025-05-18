import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { handelCreateUser, handelDeleteUser, handelGetUser, handelGetUsers, handelUpdateUser } from '../controllers/userController';
import { CreateUserBody, UpdateUserBody, UserParams } from '../types';
const userRouter = express.Router();



userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    handelGetUsers(req, res, next);
});

userRouter.get('/:id', (req: Request<UserParams>, res: Response, next: NextFunction) => {
    handelGetUser(req, res, next);
});

userRouter.post('/', (req: Request<{}, {}, CreateUserBody>, res: Response, next: NextFunction) => {
    handelCreateUser(req, res, next);
});

userRouter.delete('/:id', (req: Request<UserParams>, res: Response, next: NextFunction) => {
    handelDeleteUser(req, res, next);
});

userRouter.put('/:id', (req: Request<UserParams, {}, UpdateUserBody>, res: Response, next: NextFunction) => {
    handelUpdateUser(req, res, next);
});



export default userRouter;