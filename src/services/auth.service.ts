import { AppDataSource } from '../data-source';
import { CreateCredencialDTO } from '../DTOs/CreateCredentialDTO';
import { RegisterUserDTO } from '../DTOs/RegisterUserDTO';
import { Credencial } from '../entities/Credencial';
import { Usuario } from '../entities/Usuario';
import bcrypt from 'bcryptjs';
import { RegisterEmpresaDTO } from '../DTOs/RegisterEmpresaDTO';
import { Empresa } from '../entities/Empresa';
import { DataSource, EntityManager } from 'typeorm';
import { RegisterUserFullDTO } from '../DTOs/RegisterUserFullDTO';
import { cleanEmptyStrings } from '../utils/cleanEmptyStrings';
import { generarHorarioAtencionVacio } from '../utils/generarHorarioAtencionVacio';

//======= SERVICIOS ORQUESTADORES ==========
//==========================================
export const registerUserService = async (
   data: RegisterUserFullDTO,
   manager?: EntityManager
) => {
   const { email, password, nombre, celular, role } = data;

   if (!manager) {
      throw new Error('Transaction manager is required');
   }

   const credencial = await createCredencialService(
      { email, password },
      manager
   );

   const usuario = await createUserService(
      {
         nombre,
         celular,
         role,
         credencialId: credencial.id,
      },
      manager
   );

   return { usuario, credencial };
};

export const createEmpresaConUsuarioService = async (
   data: RegisterEmpresaDTO,
   usuarioData: RegisterUserFullDTO
) => {
   return await AppDataSource.transaction(async (manager) => {
      const empresaRepository = manager.getRepository(Empresa);

      const cleanedData = cleanEmptyStrings(data);

      cleanedData.subCategoriaOpcion = [];
      cleanedData.horarioAtencion = generarHorarioAtencionVacio();

      const existingEmpresa = await empresaRepository.findOne({
         where: { nombreFantasia: cleanedData.nombreFantasia },
      });

      if (existingEmpresa) {
         throw new Error('Ya existe una empresa con ese nombre');
      }

      // 👇 Primero crear la credencial
      const credencial = await createCredencialService(
         {
            email: usuarioData.email,
            password: usuarioData.password,
         },
         manager
      );

      // 👇 Luego agregarle el credentialId al objeto usuarioData
      const nuevoUsuario = await createUserService(
         {
            ...usuarioData,
            credencialId: credencial.id,
         },
         manager
      );

      // 👇 Crear empresa y asociar al usuario creado
      const nuevaEmpresa = empresaRepository.create({
         ...cleanedData,
         usuario: nuevoUsuario.usuario,
         mediosPago: Array.isArray(cleanedData.mediosPago)
            ? cleanedData.mediosPago
            : cleanedData.mediosPago
            ? [cleanedData.mediosPago]
            : [],
      });

      await empresaRepository.save(nuevaEmpresa);

      const savedEmpresa = await empresaRepository.findOne({
         where: { id: nuevaEmpresa.id },
         relations: ['usuario'],
      });

      return {
         message: 'Empresa registrada con éxito',
         newEmpresa: savedEmpresa,
         newUsuario: nuevoUsuario,
      };
   });
};

export const createEmpresaSinUsuarioService = async (
   data: RegisterEmpresaDTO
) => {
   const empresaRepository = AppDataSource.getRepository(Empresa);

   const cleanedData = cleanEmptyStrings(data);
   cleanedData.horarioAtencion = generarHorarioAtencionVacio();

   const nuevaEmpresa = empresaRepository.create(cleanedData);
   await empresaRepository.save(nuevaEmpresa);

   return nuevaEmpresa;
};

//======= SERVICIOS BASICOS ================
//==========================================

export const createUserService = async (
   data: RegisterUserDTO,
   manager: EntityManager
) => {
   const userRepo = manager.getRepository(Usuario);

   data.celular = data.celular || '';

   const credencial = await manager.getRepository(Credencial).findOneByOrFail({
      id: data.credencialId,
   });

   const nuevoUsuario = userRepo.create({
      ...data,
      credencial,
   });

   await userRepo.save(nuevoUsuario);

   return { usuario: nuevoUsuario };
};

export const createCredencialService = async (
   { email, password }: CreateCredencialDTO,
   manager?: EntityManager
): Promise<Credencial> => {
   const credencialRepository = manager
      ? manager.getRepository(Credencial)
      : AppDataSource.getRepository(Credencial);

   const existing = await credencialRepository.findOne({ where: { email } });
   if (existing) {
      throw new Error('El email ya está en uso.');
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const credencial = credencialRepository.create({
      email,
      password: hashedPassword,
   });

   await credencialRepository.save(credencial);

   return credencial;
};

export const createEmpresaService = async (
   data: RegisterEmpresaDTO,
   usuario?: Usuario,
   manager?: EntityManager
) => {
   const empresaRepository = manager
      ? manager.getRepository(Empresa)
      : AppDataSource.getRepository(Empresa);

   const existingEmpresa = await empresaRepository.findOne({
      where: { nombreFantasia: data.nombreFantasia },
   });

   if (existingEmpresa) {
      throw new Error('Ya existe una empresa con ese nombre');
   }

   if (!usuario) {
      throw new Error('No se encontró el usuario asociado.');
   }

   const nuevaEmpresa = empresaRepository.create({
      ...data,
      usuario,
      mediosPago: Array.isArray(data.mediosPago)
         ? data.mediosPago
         : data.mediosPago
         ? [data.mediosPago]
         : [],
   });

   await empresaRepository.save(nuevaEmpresa);

   return {
      message: 'Empresa registrada con éxito',
      empresa: nuevaEmpresa,
   };
};

export const loginUserService = async (email: string, password: string) => {
   const usuarioRepository = AppDataSource.getRepository(Usuario);

   const usuario = await usuarioRepository.findOne({
      where: {
         credencial: { email },
      },
      relations: ['credencial'],
   });

   if (!usuario) {
      throw new Error('Usuario no encontrado');
   }

   const validPassword = await bcrypt.compare(
      password,
      usuario.credencial.password
   );
   if (!validPassword) {
      throw new Error('Contraseña incorrecta');
   }

   return usuario;
};
