import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   BaseEntity,
   OneToOne,
   JoinColumn,
} from 'typeorm';
import { UserRole } from '../enums/UserRole';
import { Credencial } from './Credencial';

@Entity()
export class Usuario extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ nullable: true })
   nombre?: string;

   @Column()
   celular?: string;

   @Column({
      type: 'enum',
      enum: UserRole,
      default: UserRole.USUARIO,
      enumName: 'user_role_enum',
   })
   role: UserRole;

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;

   @OneToOne(() => Credencial, (credencial) => credencial.usuario, {
      cascade: true,
      eager: true,
   })
   @JoinColumn({ name: 'credencialId' })
   credencial: Credencial;
}
