import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Message, (message) => message.comments)
  message: Message;
}
