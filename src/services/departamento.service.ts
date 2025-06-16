import { AppDataSource } from '../data-source';
import { Departamento } from '../entities/Departamento';
import { ILike } from 'typeorm';

export class DepartamentoService {
   private departamentoRepository = AppDataSource.getRepository(Departamento);

   async searchDepartamentos(query: string): Promise<Departamento[]> {
      return this.departamentoRepository.find({
         where: { name: ILike(`%${query}%`) },
         order: { name: 'ASC' },
      });
   }

   async getDepartamentoById(id: string): Promise<Departamento | null> {
      const departamento = await this.departamentoRepository.findOne({
         where: { id: Number(id) },
      });

      return departamento;
   }
}
