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

    async ponudeNaOglas(oglasId:string, userId: string) {
        const ponude = await this.prismaS.ponuda.findMany({
            where: {
                oglasId,
            },
            include: {
                oglas: true,
                koJePoslaoPonudu: true,
            },
        });
        const authPonude = ponude.filter((ponuda) => ponuda.oglas.kreiraoKorisnikId === userId);
        
        return authPonude;
    }

    async prihvatiPonudu(ponudaId:string,userId: string){
        const ponuda = await this.prismaS.ponuda.findUnique({
            where: {
                id: ponudaId,
            },
            include:{
                oglas:true,
            }
        }
        );
        await this.prismaS.oglas.update({
            where:{
                id:ponuda.oglasId,
            },
            data:{
                stanjeOglasa:"resen"
            }
        });
        await this.prismaS.ponuda.update({
            where:{
                id:ponudaId,
            },
            data:{
                prihvacenaNaOglas:{connect:{id:ponuda.oglasId}}
            }
        });
        return ponuda;
    }
}
