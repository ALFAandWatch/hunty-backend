import { Router } from 'express';
import { listarUsuariosController } from '../controllers/usuarios.controller';

const usuariosRouter = Router();

usuariosRouter.get('/listarUsuarios', listarUsuariosController);

export default usuariosRouter;
