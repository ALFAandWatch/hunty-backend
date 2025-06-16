import { AppDataSource } from '../data-source';
import { Departamento } from '../entities/Departamento';

const departamentos = [
   'Artigas',
   'Canelones',
   'Cerro Largo',
   'Colonia',
   'Durazno',
   'Flores',
   'Florida',
   'Lavalleja',
   'Maldonado',
   'Montevideo',
   'Paysandú',
   'Río Negro',
   'Rivera',
   'Rocha',
   'Salto',
   'San José',
   'Soriano',
   'Tacuarembó',
   'Treinta y Tres',
];

export const seedDepartamentosIfEmpty = async () => {
   const repo = AppDataSource.getRepository(Departamento);
   const count = await repo.count();
   if (count === 0) {
      const entities = departamentos.map((name) => {
         const d = new Departamento();
         d.name = name;
         return d;
      });
      await repo.save(entities);
      console.log('✅ Departamentos seeded');
   } else {
      console.log('Departamentos already seeded');
   }
};
