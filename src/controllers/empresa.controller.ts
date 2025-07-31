import { Request, Response } from 'express';
import {
   deleteEmpresaService,
   getEmpresaByIdService,
   getEmpresasService,
} from '../services/empresa.service';

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

export const getEmpresaById = async (req: Request, res: Response) => {
   const id = parseInt(req.params.id, 10);

   if (isNaN(id)) {
      res.status(400).json({ message: 'ID inválido' });
      return;
   }

   try {
      const empresa = await getEmpresaByIdService(id);
      res.status(200).json(empresa);
      return;
   } catch (error) {
      res.status(404).json({ message: 'Empresa no encontrada' });
      return;
   }
};

export const deleteEmpresa = async (req: Request, res: Response) => {
   const { id } = req.params;

   try {
      await deleteEmpresaService(Number(id));
      res.status(200).json({ message: 'Empresa eliminada correctamente' });
      return;
   } catch (error: any) {
      if (error.message === 'Empresa no encontrada') {
         res.status(404).json({ message: error.message });
         return;
      }

      console.error('Error al eliminar empresa:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
   }
};
