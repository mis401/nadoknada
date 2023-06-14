import { IsNotEmpty } from "class-validator"

export class prituzbaKorisnikaDto
{
    id:string
    ishod:string
    @IsNotEmpty()
    tema:string
    @IsNotEmpty()
    kojiKorisnikSePrijavljuje:string
    //resilaKorisnickaPodrska:string
}
export class prituzbaOglasDto
{
    id:string
    ishod:string
    @IsNotEmpty()
    tema:string
    @IsNotEmpty()
    kojiOglasSePrijavljuje:string
    //resilaKorisnickaPodrska:string
}