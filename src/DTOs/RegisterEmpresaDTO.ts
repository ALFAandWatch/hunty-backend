import { PerfilEspecial } from '../enums/PerfilEspecial';

export interface HorarioDia {
   manana: { inicio: string; fin: string };
   tarde: { inicio: string; fin: string };
}

export interface Horarios {
   [dia: string]: HorarioDia;
}

export class RegisterEmpresaDTO {
   // Campos básicos
   nombreFantasia: string;
   plan: number;
   perfilEspecial?: PerfilEspecial;
   slugUrl: string;
   apellido?: string;
   cedula?: string;
   razonSocial?: string;
   rut?: string;

   // Relaciones
   usuarioId?: number;

   // Datos opcionales y ampliados
   subCategoria?: string;
   subCategoriaOpcion?: string[];
   departamento?: string;
   ciudad?: string;
   direccion?: string;
   descripcion?: string;
   telefono?: string;
   whatsapp?: string;
   web?: string;

   horarioAtencion?: Horarios;

   mediosPago?: string;

   linkInstagram?: string;
   linkFacebook?: string;
   linkTiktok?: string;
   linkYoutube?: string;
   linkX?: string;

   // Otros campos
   abiertoAhora?: boolean;
   puntuacion?: number;
}
