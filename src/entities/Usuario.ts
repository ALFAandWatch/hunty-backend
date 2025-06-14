import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   BaseEntity,
} from 'typeorm';

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

   @Column({ default: 'usuario' })
   readonly role: string = 'usuario';

   @CreateDateColumn()
   createdAt: Date;

   @UpdateDateColumn()
   updatedAt: Date;
}
