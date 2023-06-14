import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient 
{
    constructor(configS:ConfigService)
    {
        super({
            datasources:{
                db:{
                    url:configS.get("DATABASE_URL"),
                },
            },
        });
    }
}
