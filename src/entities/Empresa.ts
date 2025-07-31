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

   //........

   @Column({ nullable: true })
   descripcion?: string;

   @Column({ nullable: true })
   direccion?: string;

   @Column({ nullable: true })
   telefono?: string;

   @Column({ nullable: true })
   imagenUrl?: string;

   @Column({ nullable: true })
   departamento?: string;

   @Column({ nullable: true })
   sitioWeb?: string;

   @Column({ default: false })
   abiertoAhora?: boolean;

   @Column({ default: 0, type: 'float' })
   puntuacion?: number;

   @Column('simple-array', { default: '' })
   formasDePago?: string[];
}
