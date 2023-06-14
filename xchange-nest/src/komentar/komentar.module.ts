import { Module } from '@nestjs/common';
import { KomentarController } from './komentar.controller';
import {KomentarService } from './komentar.service';

@Module({
  controllers: [KomentarController],
  providers: [KomentarService]
})
export class KomentarModule {}