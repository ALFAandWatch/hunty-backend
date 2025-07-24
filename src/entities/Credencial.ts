import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   BaseEntity,
   OneToOne,
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity()
export class Credencial extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @OneToOne(() => Usuario, (usuario) => usuario.credencial)
   usuario: Usuario;
}
