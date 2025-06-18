import { In, MoreThanOrEqual } from 'typeorm';
import { EmpresaPerfil } from '../entities/EmpresaPerfil';

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

   // Vamos a usar un array de condiciones en vez de un solo objeto, para mayor flexibilidad
   const where: any = {};

   if (abiertoAhora !== undefined) where.abiertoAhora = abiertoAhora;
   if (esPremium !== undefined) where.esPremium = esPremium;
   if (puntuacionMin !== undefined) {
      where.puntuacion = MoreThanOrEqual(puntuacionMin);
   }

   // 👇 Filtrado para una forma de pago específica dentro del array `formasDePago`
   if (formaDePago) {
      // Esto hará un LIKE para buscar coincidencias en el string del array
      where.formasDePago = In([formaDePago]);
   }

   const [empresas, total] = await EmpresaPerfil.findAndCount({
      where,
      take,
      skip,
      order: { puntuacion: 'DESC' },
   });

   return {
      total,
      page,
      limit: take,
      data: empresas,
   };
};
