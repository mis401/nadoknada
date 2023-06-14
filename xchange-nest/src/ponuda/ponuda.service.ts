import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { error } from 'console';
import { use } from 'passport';
import { PonudaDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PonudaService 
{
    constructor(private prismaS:PrismaService){}
          
    async posaljiPonudu(dtoPonuda:PonudaDto)
    {
        try
        {
            const ponuda=await this.prismaS.ponuda.create({
                data:{
                    Naslov:dtoPonuda.Naslov,
                    vrsta:dtoPonuda.vrsta,
                    opis:dtoPonuda.opis,
                    koJePoslaoPonuduId:dtoPonuda.koJePoslaoPonuduId,
                    oglasId:dtoPonuda.oglasId
                }
            })
            return ponuda;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async obrisiPonudu(id:string,user:User)
    {
        const ponuda= await this.prismaS.ponuda.findUnique({
            where:{
                id
            },
        });
        if((ponuda.koJePoslaoPonuduId=user.id)||(user.role==="admin"))
        {   
            try
            {
            const obrisi= await this.prismaS.ponuda.delete({
                where: { id },
            });
            }
            catch(error)
            {
                console.log(error);
            }
        }
    }
}
