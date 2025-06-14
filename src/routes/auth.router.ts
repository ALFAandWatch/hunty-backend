import { Router } from 'express';
import {
   loginController,
   registerUserController,
   registerEmpresaController,
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register/user', registerUserController);
authRouter.post('/register/empresa', registerEmpresaController);

authRouter.post('/login', loginController);

export default authRouter;
