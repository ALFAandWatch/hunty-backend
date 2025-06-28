import {
   Entity,
   PrimaryGeneratedColumn,
   Column,
   ManyToOne,
   OneToMany,
   JoinColumn,
} from 'typeorm';

@Entity()
export class Category {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   name: string;

   @Column({ nullable: true })
   iconUrl?: string;

   @ManyToOne(() => Category, (category) => category.children, {
      nullable: true,
      onDelete: 'SET NULL',
   })
   @JoinColumn({ name: 'parentId' })
   parent: Category | null;

   @OneToMany(() => Category, (category) => category.parent)
   children?: Category[];
}
