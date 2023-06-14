import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { prituzbaKorisnikaDto, prituzbaOglasDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrituzbaService 
{
    constructor(private prismaS:PrismaService){}

    async prijaviKorisnika(dtoPrituzba:prituzbaKorisnikaDto, user:User)
    {
        try 
        {
            const prijaviGa=await this.prismaS.prituzba.create
            ({
                data:{
                    tema:dtoPrituzba.tema,
                    ostavljaPrituzbu:{connect:{id:user.id}},
                    kojiKorisnikSePrijavljuje:{connect:{id:dtoPrituzba.kojiKorisnikSePrijavljuje}},
                },
            })    
            return prijaviGa;
        } 
        catch (error) 
        {
            throw error;
        }
    }

    async prijaviOglas(dtoPrituzba:prituzbaOglasDto,user:User)
    {
        try 
        {
            const oglas = await this.prismaS.oglas.findUnique({
                where:{
                    id:dtoPrituzba.kojiOglasSePrijavljuje
                },
                include:{
                    kreiraoKorisnik:true
                }
            })
            const prijaviGa=await this.prismaS.prituzba.create
            ({
                data:{
                    tema:dtoPrituzba.tema,
                    ostavljaPrituzbu:{connect:{id:user.id}},
                    kojiOglasSePrijavljuje:{connect:{id:dtoPrituzba.kojiOglasSePrijavljuje}},
                    kojiKorisnikSePrijavljuje:{connect:{id:oglas.kreiraoKorisnik.id}}
                },
            })    
            return prijaviGa;
        } 
        catch (error) 
        {
            throw error;
        }
    }


    async prijave(){
        try {
            const prijave=await this.prismaS.prituzba.findMany({
                include:{
                    ostavljaPrituzbu:true,
                    kojiKorisnikSePrijavljuje:true,
                    kojiOglasSePrijavljuje:true,
                },
                take: 20,
            });
            return prijave;

        }
        catch(error){
            throw error;
        }
    }
}
