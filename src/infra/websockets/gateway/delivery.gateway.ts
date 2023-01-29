import { Server } from 'socket.io';
import {
  WebSocketServer,
  OnGatewayConnection,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class DeliveryGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  handleConnection(socket) {
    socket.join(socket.handshake.auth.token);

    socket.on('command', (command: string) => {
      this.server
        .to(socket.handshake.auth.token)
        .emit('command', `fivem-shop ${command}`);
    });
  }
}
