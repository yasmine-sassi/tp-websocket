import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesService } from './messagerie.service';
import { MessagesGateway } from './messagerie.gateway';
import { MessagesController } from './messagerie.controller';
import { Message } from './entities/message.entity';
import { Reaction } from './entities/reaction.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Reaction, Comment])],
  providers: [MessagesGateway, MessagesService],
  controllers: [MessagesController],
})
export class MessagesModule {}
