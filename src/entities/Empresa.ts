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

   @Column()
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

   @Column()
   apellido: string;

   @Column()
   cedula: string;

   @Column()
   razonSocial: string;

   @Column()
   rut: string;

   @OneToOne(() => Usuario, { nullable: true })
   @JoinColumn()
   usuario?: Usuario;

   // SECCION INFORMACION ======================================

   @Column({ nullable: true })
   subCategoria?: string;

   @Column('simple-array', { nullable: true })
   subcategoriaOpcion?: string[];

   @Column({ nullable: true })
   departamento?: string;

   @Column({ nullable: true })
   ciudad?: string;

   @Column({ nullable: true })
   direccion?: string;

   @Column({ nullable: true })
   descripcion?: string;

   @Column({ nullable: true })
   telefono?: string;

   @Column({ nullable: true })
   whatsapp?: string;

   @Column({ nullable: true })
   web?: string;

   @Column('json', { nullable: true })
   horarioAtencion?: {
      [dia: string]: {
         manana: { inicio: string; fin: string };
         tarde: { inicio: string; fin: string };
      };
   };

   @Column('json', { nullable: true })
   mediosPago: string[];

   @Column({ nullable: true })
   linkInstagram?: string;

   @Column({ nullable: true })
   linkFacebook?: string;

   @Column({ nullable: true })
   linkTiktok?: string;

   @Column({ nullable: true })
   linkYoutube?: string;

   @Column({ nullable: true })
   linkX?: string;

   // SECCION IMAGENES ======================================
   @Column({ nullable: true })
   logo: string; // URL del logo

   @Column({ nullable: true })
   banner: string; // URL del banner

   @Column('simple-array', { nullable: true })
   album: string[]; // Array de URLs de imágenes

   //........

   @Column({ default: false })
   abiertoAhora?: boolean;

   @Column({ default: 0, type: 'float' })
   puntuacion?: number;
}
