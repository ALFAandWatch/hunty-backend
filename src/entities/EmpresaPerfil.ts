import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   OneToOne,
   JoinColumn,
   BaseEntity,
} from 'typeorm';
import { EmpresaUsuario } from './EmpresaUsuario';

@Entity()
export class EmpresaPerfil extends BaseEntity {
   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   nombre: string;

   @Column({ nullable: true })
   descripcion: string;

   @Column({ nullable: true })
   direccion: string;

   @Column({ nullable: true })
   telefono: string;

   @Column({ nullable: true })
   imagenUrl: string;

   @Column()
   departamento: string;

   @Column({ nullable: true })
   sitioWeb?: string;

   @Column({ default: false })
   esPremium: boolean;

   @Column({ default: false })
   abiertoAhora: boolean;

   @Column({ default: 0, type: 'float' })
   puntuacion: number;

   @Column('simple-array', { default: '' })
   formasDePago: string[];

   @OneToOne(() => EmpresaUsuario, { nullable: true })
   @JoinColumn()
   usuario?: EmpresaUsuario;
}
