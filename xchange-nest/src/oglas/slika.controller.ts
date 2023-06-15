import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('slika')
export class SlikaController {
  @Get('imeSlike/:slika')
  getFile(@Param('slika') slika: string): StreamableFile {
    console.log(slika);
    const file = createReadStream(join(process.cwd(), 'uploads', `profileimages`, slika));
    return new StreamableFile(file);
  }
}