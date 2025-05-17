import { Router } from 'express';
import seedUserAdd from '../controllers/seedUserController';

const seedUserRouter = Router();
 

seedUserRouter.get('/', seedUserAdd);


export default seedUserRouter;