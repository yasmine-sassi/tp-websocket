import { Controller, Get, Post, Body } from '@nestjs/common';
import { MessagesService } from './messagerie.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { Message } from './entities/message.entity';
import { Comment } from './entities/comment.entity';
import { Reaction } from './entities/reaction.entity';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.createMessage(createMessageDto);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAllMessages();
  }

  @Post('comment')
  async addComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return this.messagesService.addComment(createCommentDto);
  }

  @Post('reaction')
  async addReaction(
    @Body() createReactionDto: CreateReactionDto,
  ): Promise<Reaction> {
    return this.messagesService.addReaction(createReactionDto);
  }
}
