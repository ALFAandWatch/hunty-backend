import { AppDataSource } from '../data-source';
import { CreateCredencialDTO } from '../DTOs/CreateCredentialDTO';
import { RegisterUserDTO } from '../DTOs/RegisterUserDTO';
import { Credencial } from '../entities/Credencial';
import { Usuario } from '../entities/Usuario';
import bcrypt from 'bcryptjs';
import { UserRole } from '../enums/UserRole';
import { RegisterEmpresaDTO } from '../DTOs/RegisterEmpresaDTO';
import { Empresa } from '../entities/Empresa';
import { DataSource, EntityManager } from 'typeorm';
import { RegisterUserFullDTO } from '../DTOs/RegisterUserFullDTO';

//======= SERVICIOS ORQUESTADORES ==========
//==========================================

export const registerUserService = async (
   data: RegisterUserFullDTO,
   manager?: EntityManager
) => {
   const { email, password, nombre, celular, role } = data;

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

export const registerEmpresaWithUsuarioService = async (
   empresaData: RegisterEmpresaDTO,
   userData: RegisterUserFullDTO,
   manager?: EntityManager
): Promise<{ newEmpresa: Empresa; newUsuario: Usuario }> => {
   const credencial = await createCredencialService(
      { email: userData.email, password: userData.password },
      manager
   );

   const usuario = await createUserService(
      {
         nombre: userData.nombre,
         celular: userData.celular,
         role: userData.role,
         credencialId: credencial.id,
      },
      manager
   );

   const newUsuario = usuario.usuario;

   const empresa = await createEmpresaService(empresaData, newUsuario, manager);

   const newEmpresa = empresa.empresa;

   return { newEmpresa, newUsuario };
};

//======= SERVICIOS BASICOS ================
//==========================================
export const createUserService = async (
   data: RegisterUserDTO,
   manager?: EntityManager
) => {
   const usuarioRepository = manager
      ? manager.getRepository(Usuario)
      : AppDataSource.getRepository(Usuario);

   const newUser = usuarioRepository.create({
      nombre: data.nombre,
      celular: data.celular,
      role: data.role || UserRole.USUARIO,
      credencial: { id: data.credencialId },
   });

   await usuarioRepository.save(newUser);
   return { message: 'Usuario registrado con éxito', usuario: newUser };
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

   const nuevaEmpresa = empresaRepository.create({
      ...data,
      usuario,
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
