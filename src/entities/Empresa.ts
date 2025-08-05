import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   OneToOne,
   JoinColumn,
   BaseEntity,
} from 'typeorm';
import { Usuario } from './Usuario';
import { PerfilEspecial } from '../enums/PerfilEspecial';

@Entity()
export class Empresa extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   // SECCION PERFIL ======================================

   @Column()
   nombreFantasia: string;

   @Column({ type: 'int' })
   plan: number;

   @Column({
      type: 'enum',
      enum: PerfilEspecial,
      enumName: 'perfil_especial_enum',
      nullable: true,
   })
   perfilEspecial?: PerfilEspecial;

   @Column()
   slugUrl: string;

   @Column({ nullable: true })
   apellido?: string;

   @Column()
   cedula?: string;

   @Column({ nullable: true })
   razonSocial?: string;

   @Column({ nullable: true })
   rut?: string;

   @OneToOne(() => Usuario, { nullable: true })
   @JoinColumn()
   usuario?: Usuario;

   // SECCION INFORMACION ======================================

   @Column()
   subCategoria?: string;

   @Column('simple-array', { nullable: true })
   subCategoriaOpcion?: string[];

   @Column()
   departamento?: string;

   @Column()
   ciudad?: string;

   @Column()
   direccion?: string;

   @Column()
   descripcion?: string;

   @Column()
   telefono?: string;

   @Column()
   whatsapp?: string;

   @Column()
   web?: string;

   @Column('json', { nullable: true })
   horarioAtencion?: {
      [dia: string]: {
         manana: { inicio: string; fin: string };
         tarde: { inicio: string; fin: string };
      };
   };

   @Column('json')
   mediosPago?: string[];

   @Column()
   linkInstagram?: string;

   @Column()
   linkFacebook?: string;

   @Column()
   linkTiktok?: string;

   @Column()
   linkYoutube?: string;

   @Column()
   linkX?: string;

   // SECCION IMAGENES ======================================
   @Column({ nullable: true })
   logo?: string; // URL del logo

   @Column({ nullable: true })
   banner?: string; // URL del banner

   @Column('simple-array', { nullable: true })
   album?: string[]; // Array de URLs de imágenes

   //........

   @Column({ default: false })
   abiertoAhora?: boolean;

   @Column({ default: 0, type: 'float' })
   puntuacion?: number;
}
