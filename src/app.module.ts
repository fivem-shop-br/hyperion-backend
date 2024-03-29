import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';
import { ThrottlerModule } from '@nestjs/throttler/dist/throttler.module';
import { CustomThrottlerGuard } from './auth/guards/throttler.guard';
import { WebSocketsModule } from './infra/websockets/websockets.module';
import { FindUserById } from './app/use-cases/user/find-user';

@Module({
  imports: [
    WebSocketsModule,
    HttpModule,
    DatabaseModule,
    AuthModule,
    ThrottlerModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    FindUserById,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule {}
