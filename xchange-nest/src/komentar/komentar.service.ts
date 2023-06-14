import { ForbiddenException, HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { error } from 'console';
import { get } from 'http';
import { connect } from 'http2';
import { OglasDto } from 'src/dto';
import { KomentarDto } from 'src/dto/komentar.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class KomentarService
{
    constructor(private prismaS:PrismaService){}

    async dodaj(dtoKomentar:KomentarDto)
    {
        try
        {
            const KreirajKomentar=await this.prismaS.komentar.create({
                data:{
                    tekst: dtoKomentar.tekst,
                    ocena:dtoKomentar.ocena,
                    ostavioKomentar:{connect:{id:dtoKomentar.ostavioKomentar}},
                    komeJeOstavljenKomentar:{connect:{id:dtoKomentar.komeJeOstavljenKomentar}},
                },
            });
            return KreirajKomentar;
        }
        catch(error)
        {
            throw error;
        }
    }
    @HttpCode(HttpStatus.OK)
    async obrisi(id: string,user:User)
    {
        const komentar= await this.prismaS.komentar.findUnique({
            where:{id}
        });
        if((komentar.userOstavioKomentarId===user.id)||(user.role==="admin"))
        {
            await this.prismaS.komentar.delete({
            where: { id:id },
            });
        }
        else{console.log("Nemate ovlascenja za uklanjanje ovog komentara");}
    }
    
    async getKomentar(id:string)
    {
        try
        {
            const komentar=await this.prismaS.komentar.findUnique({
                where:{
                    id
                }
            });
            return komentar;
        }
        catch(error)
            {console.log(error);}
    }
    async izmeni(id: string,text: string,ocena:number)
    {
        try
        {
            const newKomentar= await this.prismaS.komentar.update({
                where:{
                    id
                },
                data:{
                    tekst:text,
                    ocena,
                }
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }
}