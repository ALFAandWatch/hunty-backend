import { Router } from 'express';
import {
   deleteEmpresa,
   editarEmpresa,
   getEmpresaById,
   getEmpresasFiltered,
} from '../controllers/empresa.controller';

const empresaRouter = Router();

empresaRouter.get('/filtros', getEmpresasFiltered);
empresaRouter.get('/:id', getEmpresaById);
empresaRouter.put('/:id', editarEmpresa);
empresaRouter.delete('/:id', deleteEmpresa);

export default empresaRouter;
