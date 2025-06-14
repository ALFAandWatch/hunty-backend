import { Request, Response } from 'express';
import { empresasDummy } from '../helpers/empresasDummy';

export const getEmpresasDummy = (_req: Request, res: Response) => {
   res.status(200).json(empresasDummy);
};
