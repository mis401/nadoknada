import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService 
{
    constructor(private prismaS:PrismaService){}

    async getKomentari(id:string)
    {
        const komentari=await this.prismaS.komentar.findMany({
            where:{
                userOstavioKomentarId:id,
            }
        })
        return komentari;
        // const user=await this.prismaS.user.findUnique({   ovo ne radi ali bilo bi lepo kad bi radilo
        //     where:{
        //         id
        //     }
        // })
        // return user.imaKomentareNaProfilu
    }
    async getOglasi(id:string)
    {
        const oglasi=await this.prismaS.oglas.findMany({
            where:{
                kreiraoKorisnikId:id,
            }
        })
        return oglasi;
    }
    async getUser(username:string)
    {
        const user=await this.prismaS.user.findUnique({
            where:{
                username
            }
        })
        return user;
    }
    async getPrituzbe(id:string)
    {
        const prituzbe=await this.prismaS.prituzba.findMany({
            where:{
                reportovanKorisnikId:id
            }
        })
        return prituzbe;
    }
    async getPoslatePonude(id:string)
    {
        const ponude=await this.prismaS.ponuda.findMany({
            where:{
                koJePoslaoPonuduId:id
            }
        })
        return ponude;
    }
    async getAktivneOglase(id:string)
    {
        const aktivnioglasi =await this.prismaS.oglas.findMany({
            where:{
                kreiraoKorisnikId:id,
                stanjeOglasa: "aktivan",
            }

        })
        return aktivnioglasi;
    }
    async getReseneOglase(id:string)
    {
        const resenioglasi =await this.prismaS.oglas.findMany({
            where:{
                kreiraoKorisnikId:id,
                stanjeOglasa: "resen",
            }

        })
        return resenioglasi;
    }
}


