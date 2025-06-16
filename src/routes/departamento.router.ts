import { Router } from 'express';
import { DepartamentoController } from '../controllers/departamento.controller';

const departamentoRouter = Router();

departamentoRouter.get('/search', DepartamentoController.searchDepartamentos);
departamentoRouter.get('/:id', DepartamentoController.getDepartamentoById);

export default departamentoRouter;
