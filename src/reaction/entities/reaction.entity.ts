import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Reaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'like', 'heart', 'laugh', etc.

  @Column()
  author: string;

  @ManyToOne(() => Message, (message) => message.reactions)
  message: Message;
}
