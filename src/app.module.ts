import { Module } from '@nestjs/common';
import { usersModule } from './models/users/users.module';

@Module({
  imports: [usersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
