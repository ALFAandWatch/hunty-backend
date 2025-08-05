import { Request, Response } from 'express';
import {
   registerUserService,
   createEmpresaConUsuarioService,
   createEmpresaService,
   createEmpresaSinUsuarioService,
} from '../services/auth.service';

/********************** REGISTER USER *********************************/
export const registerUserController = async (req: Request, res: Response) => {
   try {
      const { email, password, nombre, celular, role } = req.body;

      if (!email || !password || !nombre) {
         res.status(400).json({ message: 'Faltan campos obligatorios' });
         return;
      }

      const nuevoUsuario = await registerUserService({
         email,
         password,
         nombre,
         celular,
         role,
      });

      res.status(201).json({
         message: 'Usuario registrado con éxito',
         usuario: {
            id: nuevoUsuario.usuario.usuario.id,
            nombre: nuevoUsuario.usuario.usuario.nombre,
            celular: nuevoUsuario.usuario.usuario.celular,
            role: nuevoUsuario.usuario.usuario.role,
         },
      });
      return;
   } catch (error: any) {
      res.status(400).json({ message: error.message });
      return;
   }
};

/********************** REGISTER EMPRESA SIN USUSARIO *********************************/
export const registerEmpresaOnlyController = async (
   req: Request,
   res: Response
) => {
   const data = req.body;
   console.log('REQ BODY:', req.body);

   try {
      const result = await createEmpresaSinUsuarioService(data);
      res.status(201).json(result);
   } catch (error: any) {
      console.error(error);
      res.status(400).json({ message: error.message });
   }
};

/********************** REGISTER EMPRESA SIN USUSARIO *********************************/
export const registerEmpresaWithUsuarioController = async (
   req: Request,
   res: Response
) => {
   const data = req.body;
   console.log('REQ BODY:', req.body);

   try {
      if (!data.email || !data.password || !data.nombre) {
         res.status(400).json({ message: 'Faltan campos obligatorios' });
         return;
      }

      const dataEmpresa = {
         nombreFantasia: data.nombreFantasia,
         plan: data.plan,
         perfilEspecial: data.perfilEspecial || 'none',
         slugUrl: data.slugUrl,
         apellido: data.apellido || '',
         cedula: data.cedula || '',
         razonSocial: data.razonSocial || '',
         rut: data.rut || '',
         subCategoria: data.subCategoria || '',
         departamento: data.departamento || '',
         ciudad: data.ciudad || '',
         direccion: data.direccion || '',
         descripcion: data.descripcion || '',
         telefono: data.telefono || '',
         whatsapp: data.whatsapp || '',
         web: data.web || '',
         linkInstagram: data.linkInstagram || '',
         linkFacebook: data.linkFacebook || '',
         linkYoutube: data.linkYoutube || '',
         linkTiktok: data.linkTiktok || '',
         linkX: data.linkX || '',
         logo: data.logo || '',
         banner: data.banner || '',
         album: data.album || [],
      };

      const userData = {
         email: data.email,
         password: data.password,
         nombre: data.nombre,
         celular: data.celular,
         role: data.role,
      };

      const result = await createEmpresaConUsuarioService(
         dataEmpresa,
         userData
      );

      res.status(201).json({
         message: 'Empresa y usuario registrados con éxito',
         empresa: result.newEmpresa,
         usuario: result.newUsuario,
      });
   } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
   }
};
