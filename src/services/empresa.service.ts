import { In, MoreThanOrEqual } from 'typeorm';
import { Empresa } from '../entities/Empresa';
import { AppDataSource } from '../data-source';

interface EmpresaFilterOptions {
   abiertoAhora?: boolean;
   esPremium?: boolean;
   puntuacionMin?: number;
   formaDePago?: string;
   page?: number;
   limit?: number;
}

export const getEmpresasService = async (options: EmpresaFilterOptions) => {
   const {
      abiertoAhora,
      esPremium,
      puntuacionMin,
      formaDePago,
      page = 1,
      limit = 10,
   } = options;

   const take = limit;
   const skip = (page - 1) * take;

   const where: any = {};

   if (abiertoAhora !== undefined) where.abiertoAhora = abiertoAhora;
   if (esPremium !== undefined) where.esPremium = esPremium;
   if (puntuacionMin !== undefined) {
      where.puntuacion = MoreThanOrEqual(puntuacionMin);
   }

   if (formaDePago) {
      where.formasDePago = In([formaDePago]);
   }

   const [empresas, total] = await Empresa.findAndCount({
      where,
      take,
      skip,
      order: { nombreFantasia: 'ASC' },
   });

   return {
      total,
      page,
      limit: take,
      data: empresas,
   };
};

export const getEmpresaByIdService = async (id: number) => {
   const empresa = await Empresa.findOneBy({ id });

   if (!empresa) {
      throw new Error('Empresa no encontrada');
   }

   return empresa;
};

export const editarEmpresaService = async (
   id: number,
   nuevosDatos: Partial<Empresa>
) => {
   const repo = AppDataSource.getRepository(Empresa);

   const empresa = await repo.findOne({ where: { id } });

   if (!empresa) {
      throw new Error('Empresa no encontrada');
   }

   repo.merge(empresa, nuevosDatos);

   const empresaActualizada = await repo.save(empresa);

   return empresaActualizada;
};

export const deleteEmpresaService = async (id: number): Promise<void> => {
   const empresaRepo = AppDataSource.getRepository(Empresa);

   const empresa = await empresaRepo.findOne({ where: { id } });

   if (!empresa) {
      throw new Error('Empresa no encontrada');
   }

   await empresaRepo.remove(empresa);
};
