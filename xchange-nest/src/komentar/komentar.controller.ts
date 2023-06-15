import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { KomentarService } from './komentar.service';
import { IzmeniKomentarDto, KomentarDto } from 'src/dto/komentar.dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('komentar')
export class KomentarController 
{
    constructor(private komentarService:KomentarService){}
    @UseGuards(AuthGuard("jwt"))
    @Post("dodajKomentar")
    dodaj(@Body("") dtoKomentar:KomentarDto)
    {
        return this.komentarService.dodaj(dtoKomentar);
    }

    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.ADMIN,Role.USER)
    @UseGuards(RolesGuard)
    @Delete("obrisi/:id")  
    obrisi(@Param("id") id:string, @GetUser() user:User)
    {
        return this.komentarService.obrisi(id,user);
    }

    @Get("/:id")
    getKomentar(@Param('id') id:string)
    {
        return this.komentarService.getKomentar(id);
    }
    @Patch("izmeni")
    izmeni(@Body() dto:IzmeniKomentarDto)
    {
        return this.komentarService.izmeni(dto.id,dto.text,dto.ocena);
    }
    @Get("sviKomentariNaKorisnika/:id")
    async getKomentariNaKorisnika(@Param("id") userId:string)
    {
        return await this.komentarService.getKomentariNaKorisnika(userId);
    }
}

