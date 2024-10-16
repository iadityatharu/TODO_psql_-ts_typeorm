import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number = 1;

  @Column()
  title: string = "";

  @Column()
  description: string = "";

  @Column({ default: false })
  isCompleted!: boolean;
}
