import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { Reaction } from '../reaction/entities/reaction.entity';
import { Comment } from '../comment/entities/comment.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // find message id

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return await this.messageRepository.save(message);
  }

  async findAllMessages(): Promise<Message[]> {
    return await this.messageRepository.find({
      relations: ['reactions', 'comments'],
    });
  }

  async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const message = await this.messageRepository.findOne({
      where: { id: createCommentDto.messageId },
    });
    if (!message) {
      throw new Error('Message not found');
    }

    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      author: createCommentDto.author,
      message,
    });

    return await this.commentRepository.save(comment);
  }

  async addReaction(createReactionDto: CreateReactionDto): Promise<Reaction> {
    const message = await this.messageRepository.findOne({
      where: { id: createReactionDto.messageId },
    });
    if (!message) {
      throw new Error('Message not found');
    }

    const reaction = this.reactionRepository.create({
      type: createReactionDto.type,
      author: createReactionDto.author,
      message,
    });

    return await this.reactionRepository.save(reaction);
  }
}
