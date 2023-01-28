import { Module } from '@nestjs/common';
import { DeliveryGateway } from './gateway/delivery.gateway';

@Module({
  providers: [DeliveryGateway],
})
export class WebSocketsModule {}
