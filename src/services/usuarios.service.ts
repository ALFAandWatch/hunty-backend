import { AppDataSource } from '../data-source';
import { Usuario } from '../entities/Usuario';

export const listarUsuariosService = async () => {
   const usuarioRepository = AppDataSource.getRepository(Usuario);
   const users = await usuarioRepository.find({
      select: [
         'id',
         'email',
         'nombre',
         'celular',
         'role',
         'createdAt',
         'updatedAt',
      ],
   });
   return users;
};
