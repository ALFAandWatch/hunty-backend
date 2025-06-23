import { Router } from 'express';
import {
   getEmpresaById,
   getEmpresasFiltered,
} from '../controllers/empresa.controller';

const empresaRouter = Router();

empresaRouter.get('/filtros', getEmpresasFiltered);
empresaRouter.get('/:id', getEmpresaById);

export default empresaRouter;
