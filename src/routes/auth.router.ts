import { Router } from 'express';
import {
   registerUserController,
   registerEmpresaOnlyController,
   registerEmpresaWithUsuarioController,
} from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/register/user', registerUserController);
authRouter.post('/register/empresa', registerEmpresaOnlyController);
authRouter.post(
   '/register/empresaWithUsuario',
   registerEmpresaWithUsuarioController
);

// authRouter.post('/login', loginController);

export default authRouter;
