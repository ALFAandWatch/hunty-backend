import { faker } from '@faker-js/faker';
import { EmpresaPerfil } from '../entities/Empresa';

const formasDePagoDisponibles = [
   'Efectivo',
   'Crédito',
   'Débito',
   'Transferencia',
   'MercadoPago',
];
const departamentos = [
   'Montevideo',
   'Canelones',
   'Maldonado',
   'Colonia',
   'Salto',
];

export const seedEmpresasIfEmpty = async () => {
   const count = await EmpresaPerfil.count();
   if (count > 0) {
      console.log('✅ Empresas ya existen. Seeder omitido.');
      return;
   }

   const puntuacion = faker.number.float({ min: 1, max: 5, fractionDigits: 1 });

   for (let i = 0; i < 50; i++) {
      const empresa = new EmpresaPerfil();
      empresa.nombre = faker.company.name();
      empresa.descripcion = faker.company.catchPhrase();
      empresa.direccion = faker.location.streetAddress();
      empresa.telefono = faker.phone.number();
      empresa.imagenUrl = faker.image.urlPicsumPhotos();
      empresa.departamento = faker.helpers.arrayElement(departamentos);
      empresa.esPremium = faker.datatype.boolean();
      empresa.abiertoAhora = faker.datatype.boolean();
      empresa.puntuacion = Math.round(puntuacion * 10) / 10;
      empresa.formasDePago = faker.helpers.arrayElements(
         formasDePagoDisponibles,
         faker.number.int({ min: 1, max: 4 })
      );
      empresa.sitioWeb = faker.internet.url();

      await empresa.save();
      console.log(`✅ Empresa creada: ${empresa.nombre}`);
   }

   console.log('🎉 Empresas generadas con éxito');
};
