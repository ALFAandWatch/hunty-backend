import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Departamento {
   @PrimaryGeneratedColumn()
   id: number;

   @Column({ unique: true })
   name: string;
}
