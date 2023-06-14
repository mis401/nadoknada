import { Module } from '@nestjs/common';
import { PrituzbaService } from './prituzba.service';
import { PrituzbaController } from './prituzba.controller';

@Module({
  providers: [PrituzbaService],
  controllers: [PrituzbaController]
})
export class PrituzbaModule {}
