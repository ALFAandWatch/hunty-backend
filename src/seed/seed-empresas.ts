import { faker } from '@faker-js/faker';
import { Empresa } from '../entities/Empresa';
import { PerfilEspecial } from '../enums/PerfilEspecial';

const formasDePagoDisponibles = [
   'efectivo',
   'transferenciaBancaria',
   'craditoVisa',
   'craditoMastercard',
   'creditoOca',
   'debitoVisa',
   'debitoMastercard',
   'mercadoPago',
   'abitab',
   'redPagos',
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
      empresa.cedula = faker.string.numeric();
      empresa.razonSocial = faker.string.alpha();
      empresa.rut = faker.string.numeric();
      empresa.descripcion = faker.company.catchPhrase();
      empresa.direccion = faker.location.streetAddress();
      empresa.telefono = faker.phone.number();
      empresa.subCategoria = faker.commerce.department();
      empresa.ciudad = faker.location.city();
      empresa.whatsapp = faker.phone.number();
      empresa.linkInstagram = faker.internet.url();
      empresa.linkYoutube = faker.internet.url();
      empresa.linkFacebook = faker.internet.url();
      empresa.linkTiktok = faker.internet.url();
      empresa.linkX = faker.internet.url();
      empresa.departamento = faker.helpers.arrayElement(departamentos);
      empresa.abiertoAhora = faker.datatype.boolean();
      empresa.puntuacion = Math.round(puntuacion * 10) / 10;
      empresa.mediosPago = faker.helpers.arrayElements(
         formasDePagoDisponibles,
         faker.number.int({ min: 1, max: 4 })
      );
      empresa.web = faker.internet.url();

      empresa.horarioAtencion = {
         lunes: {
            manana: { inicio: '08:00', fin: '12:00' },
            tarde: { inicio: '14:00', fin: '18:00' },
         },
         martes: {
            manana: { inicio: '08:00', fin: '12:00' },
            tarde: { inicio: '14:00', fin: '18:00' },
         },
         miercoles: {
            manana: { inicio: '08:00', fin: '12:00' },
            tarde: { inicio: '14:00', fin: '18:00' },
         },
         jueves: {
            manana: { inicio: '08:00', fin: '12:00' },
            tarde: { inicio: '14:00', fin: '18:00' },
         },
         viernes: {
            manana: { inicio: '08:00', fin: '12:00' },
            tarde: { inicio: '14:00', fin: '18:00' },
         },
         sabado: {
            manana: { inicio: '09:00', fin: '13:00' },
            tarde: { inicio: '16:00', fin: '19:00' },
         },
         domingo: {
            manana: { inicio: '10:00', fin: '12:00' },
            tarde: { inicio: '16:00', fin: '20:00' },
         },
      };

      await empresa.save();
      console.log(`✅ Empresa creada: ${empresa.nombreFantasia}`);
   }

   console.log('🎉 Empresas generadas con éxito');
};
