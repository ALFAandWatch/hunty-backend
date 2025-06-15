import { Router } from 'express';
import authRouter from './auth.router';
import empresaRouter from './empresa.router';
import categoryRouter from './category.router';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/empresas', empresaRouter);
router.use('/categorias', categoryRouter);

export default router;
