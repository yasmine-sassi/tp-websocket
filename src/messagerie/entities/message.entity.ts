import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reaction } from './reaction.entity';
import { Comment } from './comment.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction[];

  @OneToMany(() => Comment, (comment) => comment.message)
  comments: Comment[];
}
