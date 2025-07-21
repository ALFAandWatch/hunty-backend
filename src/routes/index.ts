import { Router } from 'express';
import authRouter from './auth.router';
import empresaRouter from './empresa.router';
import categoryRouter from './category.router';
import departamentoRouter from './departamento.router';
import usuariosRouter from './usuarios.router';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/usuarios', usuariosRouter);
router.use('/empresas', empresaRouter);
router.use('/categorias', categoryRouter);
router.use('/departamentos', departamentoRouter);

export default router;
