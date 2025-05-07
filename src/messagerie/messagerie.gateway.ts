import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from './messagerie.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateReactionDto } from './dto/create-reaction.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  afterInit(server: Server) {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(client: Socket, payload: CreateMessageDto) {
    const message = await this.messagesService.createMessage(payload);
    this.server.emit('newMessage', message);
  }

  @SubscribeMessage('sendComment')
  async handleSendComment(client: Socket, payload: CreateCommentDto) {
    const comment = await this.messagesService.addComment(payload);
    this.server.emit('newComment', comment);
  }

  @SubscribeMessage('sendReaction')
  async handleSendReaction(client: Socket, payload: CreateReactionDto) {
    const reaction = await this.messagesService.addReaction(payload);
    this.server.emit('newReaction', reaction);
  }

  @SubscribeMessage('requestAllMessages')
  async handleRequestAllMessages(client: Socket) {
    const messages = await this.messagesService.findAllMessages();
    client.emit('allMessages', messages);
  }
}
