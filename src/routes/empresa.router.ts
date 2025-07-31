import { Router } from 'express';
import {
   deleteEmpresa,
   getEmpresaById,
   getEmpresasFiltered,
} from '../controllers/empresa.controller';

const empresaRouter = Router();

empresaRouter.get('/filtros', getEmpresasFiltered);
empresaRouter.get('/:id', getEmpresaById);
empresaRouter.delete('/:id', deleteEmpresa);

export default empresaRouter;
