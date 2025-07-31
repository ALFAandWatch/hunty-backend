import { PerfilEspecial } from '../enums/PerfilEspecial';

export interface RegisterEmpresaDTO {
   nombreFantasia: string;
   plan: number;
   perfilEspecial?: PerfilEspecial;
   slugUrl: string;
   apellido: string;
   cedula: string;
   razonSocial: string;
   rut: string;
   //...

   nombre?: string;
   descripcion?: string;
   direccion?: string;
   telefono?: string;
   imagenUrl?: string;
   departamento?: string;
   sitioWeb?: string;
   abiertoAhora?: boolean;
   puntuacion?: number;
   formasDePago?: string[];
}
