import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   BaseEntity,
} from 'typeorm';
import { UserRole } from '../enums/UserRole';

@Entity()
export class Usuario extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column({ unique: true })
   email: string;

   @Column()
   password: string;

   @Column({ nullable: true })
   nombre?: string;

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
}
