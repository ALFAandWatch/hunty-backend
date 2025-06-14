import { Router } from 'express';
import { getEmpresasDummy } from '../controllers/empresa.controller';

const empresaRouter = Router();

empresaRouter.get('/dummy', getEmpresasDummy); // GET /api/empresas/dummy

export default empresaRouter;
