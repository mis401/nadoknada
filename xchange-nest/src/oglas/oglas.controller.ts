import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors, UploadedFile, Put} from '@nestjs/common';
import { OglasService } from './oglas.service';
import { PretragaOglasaDto, ObrisiOglasDto, OglasDto, PretplacujeSeNaOglasDto, IzmeniOglasDto } from 'src/dto';
import { Kategorija, User } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { use } from 'passport';
import { json } from 'stream/consumers';
import { query } from 'express';
export const storage = {
    storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`);
        }, 
    }
    )

}
@Controller('oglas')
export class OglasController 
{
    constructor(private oglasService:OglasService){}

    @UseGuards(AuthGuard("jwt"))
    @UseInterceptors(FileInterceptor('file', storage))
    @Post("dodajOglas")
    async dodaj(@UploadedFile() file: Express.Multer.File, @Body() oglas: OglasDto, @GetUser() user: User) {
        console.log(file);
        console.log(file.filename);
        console.log(oglas);
        oglas.slike = [];
        oglas.slike.push(file.filename);
        console.log(oglas);
        oglas.kategorijeIds = (oglas.kategorijeIds as unknown as string).split(',');
        oglas.kreiraoKorisnikId = user.id;
        return await this.oglasService.dodaj(oglas);
    }
    // dodaj(@Body("") dtoOglas:OglasDto)
    // {
    //     return this.oglasService.dodaj(dtoOglas);
    // }
    @UseGuards(AuthGuard("jwt"))
    //@Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post("pretplatiSeNaOglas/:id")
    pretplatiSeNaOglas(@Param("id") id:string, @GetUser() user:User)
    {
        return this.oglasService.pretplacujeSeNaOglas(id,user.id);
    }

    @UseGuards(AuthGuard("jwt"))
    //@Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Post("odjaviSeSaOglasa/:id")
    odjaviSeSaOglasa(@Param("id") id:string, @GetUser() user:User)
    {
        return this.oglasService.odjavljujeSeSaOglasa(id,user.id);
    }
    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.ADMIN,Role.USER)
    @UseGuards(RolesGuard)
    @Delete("obrisi/:id")
    obrisiAdmin(@Param("id") id:string,@GetUser() user:User)
    {
        return this.oglasService.obrisi(id, user);
    }

    @Get("oglasPoID/:id")
    getOglas(@Param("id") id:string)
    {
        return this.oglasService.getOglas(id);
    }
    @Patch("izmeni")
    izmeni(@Body() dto:IzmeniOglasDto)
    {
        return this.oglasService.izmeni(dto);
    }
    @Get("pretraziOglas") 
    pretraziOglas(@Query("kategorija") kategorija:string, @Query("naslov") naslov:string)
    {
        return this.oglasService.pretraziOglas(kategorija,naslov);
    }
    @Get("svePrituzbe/:id")
    getPrituzbe(@Param("id") id:string)
    {
        return this.oglasService.getPrituzbe(id);
    }
    @Get("svePonudeNaOglas/:id")
    getPonudaNaOglas(@Param("id") id:string)
    {
        return this.oglasService.getPonudeNaOglas(id);
    }
    @Patch("brojPoseta/:id")
    brojPoseta(@Param("id") id:string)
    {
        this.oglasService.brojPoseta(id);
    }
    @Patch("prihvataPonudu/:id")
    prihvataPonudu(@Param("id") id:string)
    {
        return this.oglasService.prihvataPonudu(id);
    }
    @Get("sviOglasiPoDatumu")
    vratiOglaseSortiranePoDatumu(@Query()queryParams)
    {
        return this.oglasService.vratiOglaseSortiranePoDatumu();
    }
    // ulancavanje vise filtera
    //fileri: po datumu kreiranja
    //mozda broj prijavljenih na oglas
    //ne moze da se obrisu ponude na resen oglas// ne moze da se obrise resen oglas

    @Post('upload')
    @UseInterceptors(FileInterceptor('file',storage))
    async uploadFile(@UploadedFile() file: Express.Multer.File,@Body('oglasId') oglasId: string) {
        const oglas = await this.oglasService.getOglas(oglasId);
        oglas.slike.push(file.path);
        console.log(oglas);
        await this.oglasService.izmeni(oglas);
    console.log(file);
    console.log(oglasId);
    }



    @UseGuards(AuthGuard("jwt"))
    @Post('prijaviOglas')
    async prijaviOglas(@GetUser() korisnikId: User, @Body('razlog') razlog: string, @Body('oglas') oglasId: string) {
        return await this.oglasService.prijaviOglas(oglasId, korisnikId.id, razlog);
    }

    @UseGuards(AuthGuard("jwt"))
    @Post('ponudiNaOglas')
    async ponudiNaOglas(@GetUser() korisnikId: User, @Body('ponuda') ponuda: string, @Body('oglas') oglasId: string) {
        console.log("Pre servisa");
        return await this.oglasService.ponudiNaOglas(oglasId, korisnikId.id, ponuda);
    }

    @UseGuards(AuthGuard("jwt"))
    @Put('vidjen')
    async vidjen(@GetUser() korisnik: User, @Body('oglas') oglasId: string) {
        return await this.oglasService.vidjen(oglasId, korisnik.id);
    }

    @Get('kategorije')
    vratiKategorije(){
       return this.oglasService.vratiSveKategorije();
    }

    @UseGuards(AuthGuard("jwt"))
    @Get('mojiOglasi')
    async vratiMojeOglase(@GetUser() korisnik: User){
        return await this.oglasService.vratiMojeOglase(korisnik.id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get('zapraceniOglasi')
    async vratiZapraceneOglase(@GetUser() korisnik: User){
        return await this.oglasService.vratiZapraceneOglase(korisnik.id);
    }

    @Get('oglasiKategorije')
    async vratiOglaseKategorije(@Query('kategorija') kategorija: string){
        return await this.oglasService.vratiOglaseKategorije(kategorija);
    }

    @Get('ucitajOglasPoId/:id')
    async vratiOglasPoId(@Param('id') id: string){
        return await this.oglasService.vratiOglasPoId(id);
    }

    @Get(`najpoznatijiOglasi`)
    async vratiNajpoznatijeOglase(){
        return await this.oglasService.vratiNajpoznatijeOglase();
    }
}
