import { IsNotEmpty } from "class-validator";

export class PonudaDto
{
    id: string;
    @IsNotEmpty()
    Naslov:string;
    @IsNotEmpty()
    vrsta:string;
    @IsNotEmpty()
    opis:string;
    //slika:string;
    @IsNotEmpty()
    koJePoslaoPonuduId:string;
    @IsNotEmpty()
    oglasId:string;
}