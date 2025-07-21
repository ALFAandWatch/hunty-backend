import { AppDataSource } from '../data-source';
import { RegisterUserDTO } from '../DTOs/RegisterUserDTO';
import { EmpresaUsuario } from '../entities/EmpresaUsuario';
import { Usuario } from '../entities/Usuario';
import bcrypt from 'bcryptjs';

export const registerUserService = async (data: RegisterUserDTO) => {
   const usuarioRepository = AppDataSource.getRepository(Usuario);

   const existingUser = await usuarioRepository.findOne({
      where: { email: data.email },
   });
   if (existingUser) {
      throw new Error('El usuario ya existe');
   }

   const hashedPassword = await bcrypt.hash(data.password, 10);

   const newUser = usuarioRepository.create({
      email: data.email,
      password: hashedPassword,
      nombre: data.nombre,
      celular: data.celular,
      role: data.role,
   });

   await usuarioRepository.save(newUser);
   return { message: 'Usuario registrado con éxito', usuario: newUser };
};

export const registerEmpresaService = async (
   email: string,
   password: string
) => {
   const empresaRepository = AppDataSource.getRepository(EmpresaUsuario);

   const existingEmpresa = await empresaRepository.findOne({
      where: { email },
   });
   if (existingEmpresa) {
      throw new Error('La empresa ya existe');
   }

   const hashedPassword = await bcrypt.hash(password, 10);
   const nuevaEmpresa = empresaRepository.create({
      email,
      password: hashedPassword,
   });

   await empresaRepository.save(nuevaEmpresa);
   return { message: 'Empresa registrada con éxito', empresa: nuevaEmpresa };
};

export const loginUserService = async (email: string, password: string) => {
   const usuarioRepository = AppDataSource.getRepository(Usuario);

   const usuario = await usuarioRepository.findOne({ where: { email } });
   if (!usuario) {
      throw new Error('Usuario no encontrado');
   }

   const validPassword = await bcrypt.compare(password, usuario.password);
   if (!validPassword) {
      throw new Error('Contraseña incorrecta');
   }

   return usuario;
};

export const loginEmpresaService = async (email: string, password: string) => {
   const empresaRepository = AppDataSource.getRepository(EmpresaUsuario);

   const empresa = await empresaRepository.findOne({ where: { email } });
   if (!empresa) {
      throw new Error('Empresa no encontrada');
   }

   const validPassword = await bcrypt.compare(password, empresa.password);
   if (!validPassword) {
      throw new Error('Contraseña incorrecta');
   }

   return empresa;
};
