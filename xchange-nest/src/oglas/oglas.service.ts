import { ForbiddenException, HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Kategorija, Oglas, User } from '@prisma/client';
import { use } from 'passport';
import { IzmeniOglasDto, OglasDto, PretplacujeSeNaOglasDto } from 'src/dto';
import { EmailService } from 'src/email/email.service';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OglasService 
{
    constructor(private prismaS:PrismaService, private emailS:EmailService){}

    async dodaj(dtoOglas:OglasDto)
    {
        try
        {
            console.log(dtoOglas);
            const kreirajOglas=await this.prismaS.oglas.create({
                data:{
                    naziv:dtoOglas.naziv,
                    kvalitet:dtoOglas.kvalitet,
                    brojPoseta: dtoOglas.brojPoseta,
                    opis:dtoOglas.opis,
                    ponuda: dtoOglas.ponuda,
                    slike:dtoOglas.slike,
                    kreiraoKorisnik:{connect:{id:dtoOglas.kreiraoKorisnikId}}, //citati iz JWT
                    kategorije: { connect: dtoOglas.kategorijeIds.map((k)=>({id:k}))},
                },
            });
            return kreirajOglas;
    
        }
        catch(error)
        {
            throw error;
        }
    }
    async pretplacujeSeNaOglas(idOglasa:string,idUsera:string)
    {
        try {
            const pretplati=await this.prismaS.oglas.update({
                where:{
                        id:idOglasa,
                },  
                data:{
                    pretplaceniKorisnici:{connect:{id:idUsera}},
                },
            });
            const pretplacneni=await this.prismaS.user.update({
                where:{
                        id:idUsera,
                },  
                data:{
                    pretplaceniOglasi:{connect:{id:idOglasa}},
                },
            });
            console.log(pretplati);
            return pretplati;
        } 
        catch (error) {
            console.log(error);
        }
    }
    async odjavljujeSeSaOglasa(idOglasa:string,idUsera:string)
    {
        try {
            const odjavi=await this.prismaS.oglas.update({
                where:{
                    id:idOglasa,
                },
                data:{
                    pretplaceniKorisnici:{disconnect: { id: idUsera}}, 
                },
            });
            const odjaviMe=await this.prismaS.user.update({
                where:{
                    id:idUsera,
                },
                data:{
                    pretplaceniOglasi:{disconnect:{id:idOglasa}},
                },
            });
            return odjavi;
        } 
        catch (error) {
            throw error
        }
    }

    @HttpCode(HttpStatus.OK)
    async obrisiOglas(id: string)
    {
        const kategorija=await this.prismaS.kategorija.findMany({ 
            where: { 
               oglasi: { 
                   some: { 
                        id
                    }
                }
            }, 
        });
        await Promise.all( kategorija.map((kategorija) => this.prismaS.kategorija.update({ 
            where: { 
                id: kategorija.id 
            }, 
            data: {   
               oglasi: { disconnect: { id } } 
            }, 
        })));

        const obrisi= await this.prismaS.oglas.delete({
          where: { id },
        });
    }
    async obrisi(id: string,user:User)
    {
        const oglas = await this.prismaS.oglas.findUnique({
            where:{
                id
            }
        })
        console.log(oglas);
        if ((oglas.kreiraoKorisnikId===user.id)||(user.role==="admin")) 
        {
            const usersid= oglas.pretplacujeSeIds;
            usersid.forEach(async element => {
                console.log(element);
                const user= await this.prismaS.user.findUnique({where: {id: element}});
                console.log(user);
                await this.emailS.sendEmail(user.email, "Oglas obrisan!!", `Oglas: ${oglas.naziv} je obrisan`);
            });
            
            await this.obrisiOglas(id);
            console.log("Uspesno obrisano");

        }  
        else
        {
            console.log("Nemate ovlascenja za brisanje ovog oglasa");
        }
    }
    async pretraziOglas(nazivKategorija:string,naslov:string)
    {
        if(naslov==="" && nazivKategorija==="")
            throw new HttpException("Niste uneli parametre za pretragu",HttpStatus.BAD_REQUEST);
        console.log(naslov)
        if(nazivKategorija==="")
        {
            return this.pretraziOglasPoNaslovu(naslov);
        }
        else
        {
            const kategorija=await this.prismaS.kategorija.findFirst({
                where:{
                    naziv:nazivKategorija,
                },
            });
            
           return this.trazi(naslov,kategorija.id);
        }
        
    }
    async trazi(naslov:string,kategorijaId:string)
    {
        const oglas=await this.prismaS.oglas.findMany({
            where:{
                AND: [
                    { naziv: { contains: naslov, mode: 'insensitive' } },
                    { stanjeOglasa: {contains: "aktivan", mode: 'insensitive' }}
                ],
                kategorije: { 
                    some: {
                        id: kategorijaId,
                    }, 
                }, 
            },
            include :{
                kreiraoKorisnik:true,
                kategorije: true,
            }
        })
        return oglas;
    }
    async pretraziOglasPoNaslovu(name: string) 
    { 
        const oglasi = await this.prismaS.oglas.findMany({
             where: { 
                AND: [
                    { naziv: { contains: name, mode: 'insensitive' } },
                    { stanjeOglasa: {contains: "aktivan", mode: 'insensitive' } },
                ],
            }, 
            include: {
                kreiraoKorisnik: true,
                kategorije: true,
            },
        });
        for (let oglas of oglasi){
            delete (oglas.kreiraoKorisnik.hash);
        }
        return oglasi;
    }
    async getOglas(id:string)
    {
        const oglas= await this.prismaS.oglas.findUnique({
            where:{
                id
            },
            include:{
                kategorije:true,
                kreiraoKorisnik:true,
            }
        });
        return oglas;
    }
    async izmeni(dtoIzmeniOglas:IzmeniOglasDto)
    {
        const oglas= await this.prismaS.oglas.findUnique({where: {id: dtoIzmeniOglas.id}})
        const usersid= oglas.pretplacujeSeIds;
            usersid.forEach(async element => {
                console.log(element);
                const user= await this.prismaS.user.findUnique({where: {id: element}});
                console.log(user.email);
                await this.emailS.sendEmail(user.email, "Oglas izmenjen!!", `Oglas: ${oglas.naziv} je izmenjen`);
            });
        const newOglas= await this.prismaS.oglas.update({
            where:{
                id:dtoIzmeniOglas.id 
            },
            data:{
                naziv:dtoIzmeniOglas.naziv,
                opis:dtoIzmeniOglas.opis,
                kvalitet:dtoIzmeniOglas.kvalitet,
                ponuda:dtoIzmeniOglas.ponuda,
                slike: dtoIzmeniOglas.slike
            }
        });
        return newOglas;
    }
    async getPrituzbe(id:string)
    {
        const prituzbe=await this.prismaS.prituzba.findMany({
            where:{
                reportovanOglasId:id
            }
        })
        return prituzbe;
    }
    async getPonudeNaOglas(id:string)
    {
        const ponude=await this.prismaS.ponuda.findMany({
            where:{
                oglasId:id
            }
        })
        return ponude;
    }
    async brojPoseta(id:string)
    {
        const oglas= this.prismaS.oglas.update({
            where:{
                id
            },
            data:{brojPoseta:{increment:1}},
        });
        
        return oglas;
    }
    async prihvataPonudu(id:string)
    {
        const ponuda=await this.prismaS.ponuda.findUnique({
            where:{id}
        });
        
        const oglas=this.prismaS.oglas.update({
            where:{
                id:ponuda.oglasId
            },
            data:{
                prihvacenaPonuda:{connect:{id}},
                stanjeOglasa:"resen"
            }
        });
        const ponudaNaOglas=await this.prismaS.ponuda.update({
            where:{id},
            data:{
                prihvacenaNaOglas:{connect:{id:(await oglas).id}},
            }
        });
    }
    async vratiOglaseSortiranePoDatumu() {
        const oglasi = await this.prismaS.oglas.findMany({
          orderBy: {
            datumKreiranja: 'desc',
          },
        });
      
        return oglasi;
      }

    async vratiSveKategorije(){
        const kategorije = await this.prismaS.kategorija.findMany();
        return kategorije;
    }

    async prijaviOglas(idOglasa:string, idUsera:string, razlog:string) {
        const oglas = await this.prismaS.oglas.findUnique({
            where:{
                id:idOglasa
            }
        });
        if((oglas.kreiraoKorisnikId===idUsera))
            throw new HttpException('Ne mozete prijaviti oglas koji ste kreirali', HttpStatus.BAD_REQUEST);
        const prituzba = await this.prismaS.prituzba.create({
            data: {
                ishod: 'na cekanju',
                tema: razlog,
                ostavljaPrituzbu: {connect: {id:idUsera}},
                kojiKorisnikSePrijavljuje: {connect: {id: oglas.kreiraoKorisnikId}},
                kojiOglasSePrijavljuje: {connect: {id: idOglasa}},
            },
        }); 
        prituzba.reportovanKorisnikId='';
        return prituzba;
    }


    async ponudiNaOglas(idOglasa:string, idUsera:string, ponuda:string) {
        console.log("usao u ponudu na oglas")
        let oglas = await this.prismaS.oglas.findUnique({
            where:{
                id:idOglasa
            }
        });
        const korisnikSaPonudom = await this.prismaS.user.findUnique({
            where:{
                id:idUsera
            }
        });
        if(oglas.kreiraoKorisnikId===idUsera)
            throw new HttpException('Ne mozete ponuditi na oglas koji ste kreirali', HttpStatus.BAD_REQUEST);
        const ponudaNaOglas = await this.prismaS.ponuda.create({
            data: {
                Naslov: `Ponuda od ${korisnikSaPonudom.username}`,
                vrsta: 'posebna',
                opis: ponuda,
                slika: ``,
                koJePoslaoPonudu: {connect: {id:idUsera}},
                oglas: {connect: {id:idOglasa}},
                prihvacenaNaOglas: undefined,
            },
        });
        oglas = await this.prismaS.oglas.findUnique({
            where:{
                id:idOglasa
            }
        });
        return oglas;
    }


    async vidjen(oglas: string, user: string) {
        const oglasZaVidjenje = await this.prismaS.oglas.findUnique({
            where: {
                id: oglas,
            },
        });
        if (oglasZaVidjenje.pregledavaIds.includes(user)) 
            return false;
        await this.prismaS.oglas.update({
            where: {
                id: oglas,
            },
            data: {
                pregledaliKorisnici: {connect: {id: user}},
                brojPoseta: {increment: 1},
            },
        });
    }

    async vratiMojeOglase(userId: string){
        const oglasi = await this.prismaS.oglas.findMany({
            where:{
                kreiraoKorisnikId: userId
            },
            include:{
                kategorije: true,
                kreiraoKorisnik: true,
            },
        });
        const user = await this.prismaS.user.findUnique({
            where:{
                id: userId
            }
        });

        const mojiOglasi = [];
        for (let o of oglasi){
            mojiOglasi.push({
                ...o,
                kreiraoKorisnikUsername: user.username,
            });
        }
        return mojiOglasi;
    }


    async vratiZapraceneOglase(userId: string){
        //write a prisma query for all oglas that are prati by user
        const oglasi = await this.prismaS.oglas.findMany({
            where:{
                AND: [
                    {stanjeOglasa: { contains: "aktivan", mode: "insensitive"}},
                    {pretplaceniKorisnici: {some: {id: userId}}},
                ]
            }
        });
        return oglasi;
    }

    async vratiOglaseKategorije(kategorijaId : string){
        const oglasi = await this.prismaS.oglas.findMany({
            where:{
                AND: [
                {kategorije: {some: {id: kategorijaId}}},
                {stanjeOglasa: { contains: "aktivan", mode: "insensitive"}}
                ]
            }
        });
        return oglasi;
    }

    async vratiOglasPoId(oglasId: string){
        const oglasi = await this.prismaS.oglas.findFirst({
            where:{
                id: oglasId
            },
            include:{
                kreiraoKorisnik: true,
                kategorije: true,
            }
        });
        return oglasi;
    }


    async vratiNajpoznatijeOglase(){
        const oglasi = await this.prismaS.oglas.findMany({
            where:{
                stanjeOglasa: { contains: "aktivan", mode: "insensitive"}
            },
            orderBy: {
                brojPoseta: 'desc',
            },
            include:{
                kreiraoKorisnik: true,
                kategorije: true,
            },
            take: 10,
        });
        return oglasi;
    }
}
