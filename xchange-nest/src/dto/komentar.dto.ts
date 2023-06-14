import{IsNotEmpty } from "class-validator"

export class KomentarDto
{
    id:string;
    @IsNotEmpty()
    tekst:string;
    @IsNotEmpty()
    ocena:number;
    //@IsNotEmpty()
    datumPostavljanja: Date;
    @IsNotEmpty()
    ostavioKomentar: string;
    @IsNotEmpty()
    komeJeOstavljenKomentar:string;
};
export class IzmeniKomentarDto
{
    @IsNotEmpty()
    id:string;
    @IsNotEmpty()
    text: string;
    @IsNotEmpty()
    ocena: number;
}