import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   BaseEntity,
} from 'typeorm';

@Entity()
export class EmpresaUsuario extends BaseEntity {
   @PrimaryGeneratedColumn('uuid')
   id!: string;

   @Column({ unique: true })
   email!: string;

   @Column()
   password!: string;

   @Column({ nullable: true })
   nombre?: string;

   @Column({ nullable: true })
   direccion?: string;

   @Column({ default: 'empresa' })
   readonly role: string = 'empresa';

   @CreateDateColumn()
   createdAt!: Date;

   @UpdateDateColumn()
   updatedAt!: Date;
}
