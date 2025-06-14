import { Router } from 'express';
import authRouter from './auth.router';
import empresaRouter from './empresa.router';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/empresas', empresaRouter);

export default router;
