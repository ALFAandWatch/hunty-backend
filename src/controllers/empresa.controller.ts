import { Request, Response } from 'express';
import { getEmpresasService } from '../services/empresa.service';

export const getEmpresasFiltered = async (req: Request, res: Response) => {
   try {
      const { abierto, premium, puntuacionMin, formaPago, page, limit } =
         req.query;

      const result = await getEmpresasService({
         abiertoAhora:
            abierto === 'true' ? true : abierto === 'false' ? false : undefined,
         esPremium:
            premium === 'true' ? true : premium === 'false' ? false : undefined,
         puntuacionMin: puntuacionMin ? Number(puntuacionMin) : undefined,
         formaDePago: formaPago as string,
         page: page ? Number(page) : 1,
         limit: limit ? Number(limit) : 10,
      });

      res.json(result);
   } catch (error) {
      console.error('Error al obtener empresas:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
   }
};
