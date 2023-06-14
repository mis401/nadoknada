import { Module } from '@nestjs/common';
import { PonudaController } from './ponuda.controller';
import { PonudaService } from './ponuda.service';

@Module({
  controllers: [PonudaController],
  providers: [PonudaService]
})
export class PonudaModule {}
