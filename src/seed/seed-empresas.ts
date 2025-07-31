import { faker } from '@faker-js/faker';
import { Empresa } from '../entities/Empresa';
import { PerfilEspecial } from '../enums/PerfilEspecial';

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

const planes = [0, 900, 12500, 2500, 4200, 7000, 4500];

export const seedEmpresasIfEmpty = async () => {
   const perfilEspecial = (): PerfilEspecial => {
      const values = Object.values(PerfilEspecial);
      return values[Math.floor(Math.random() * values.length)];
   };

   const count = await Empresa.count();
   if (count > 0) {
      console.log('✅ Empresas ya existen. Seeder omitido.');
      return;
   }

   const puntuacion = faker.number.float({ min: 1, max: 5, fractionDigits: 1 });

   for (let i = 0; i < 50; i++) {
      const empresa = new Empresa();
      empresa.nombreFantasia = faker.company.name();
      empresa.plan = faker.helpers.arrayElement(planes);
      empresa.slugUrl = faker.internet.url();
      empresa.perfilEspecial = perfilEspecial();
      empresa.apellido = faker.person.lastName();
      empresa.cedula = faker.string.numeric();
      empresa.razonSocial = faker.string.alpha();
      empresa.rut = faker.string.numeric();
      empresa.descripcion = faker.company.catchPhrase();
      empresa.direccion = faker.location.streetAddress();
      empresa.telefono = faker.phone.number();
      empresa.imagenUrl = faker.image.urlPicsumPhotos();
      empresa.departamento = faker.helpers.arrayElement(departamentos);
      empresa.abiertoAhora = faker.datatype.boolean();
      empresa.puntuacion = Math.round(puntuacion * 10) / 10;
      empresa.formasDePago = faker.helpers.arrayElements(
         formasDePagoDisponibles,
         faker.number.int({ min: 1, max: 4 })
      );
      empresa.sitioWeb = faker.internet.url();

      await empresa.save();
      console.log(`✅ Empresa creada: ${empresa.nombreFantasia}`);
   }

   console.log('🎉 Empresas generadas con éxito');
};
