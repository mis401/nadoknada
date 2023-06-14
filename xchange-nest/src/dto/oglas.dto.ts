import { User } from "@prisma/client";
import{ IsNotEmpty, isNotEmpty } from "class-validator"

export class OglasDto
{
    id:string;
    @IsNotEmpty()
    naziv:string;
    @IsNotEmpty()
    kvalitet:string;
    brojPoseta: number;
    @IsNotEmpty()
    opis:string;
    //slike: string;
    datumKreiranja: Date;
    @IsNotEmpty()
    ponuda: string;
    aktivanOglas:boolean;
    resenOglas:boolean;
    obrisanOglas :boolean;
    datumResavanja:Date;
    datumBrisanja:Date;
    razlogBrisanja:string;
    @IsNotEmpty()
    kreiraoKorisnikId:string;
    @IsNotEmpty()
    kategorijeIds:string[];
    @IsNotEmpty()
    slike: string[];
};

export class PretragaOglasaDto
{
    @IsNotEmpty()
    naziv:string
}
export class PretplacujeSeNaOglasDto
{
    @IsNotEmpty()
    oglas:string
    @IsNotEmpty()
    korisnik:string
}
export class ObrisiOglasDto
{
    @IsNotEmpty()
    id: string
}
export class IzmeniOglasDto
{
    @IsNotEmpty()
    id:string;
    @IsNotEmpty()
    naziv:string;
    @IsNotEmpty()
    opis:string;
    @IsNotEmpty()
    ponuda: string;
    @IsNotEmpty()
    kvalitet:string;
    @IsNotEmpty()
    slike:string[];
}