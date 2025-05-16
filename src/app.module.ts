import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from './messagerie/messagerie.module';
import { CommentModule } from './comment/comment.module';
import { MessageModule } from './message/message.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest-messagerie',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MessagesModule,
    CommentModule,
    MessageModule,
    ReactionModule,
  ],
})
export class AppModule {}
