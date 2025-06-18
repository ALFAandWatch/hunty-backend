import { Router } from 'express';
import { getEmpresasFiltered } from '../controllers/empresa.controller';

const empresaRouter = Router();

empresaRouter.get('/filtros', getEmpresasFiltered);

export default empresaRouter;
