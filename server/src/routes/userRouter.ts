import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { handelGetUsers } from '../controllers/userController';
const userRouter = express.Router();



userRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  handelGetUsers(req, res, next);
});


export default userRouter;