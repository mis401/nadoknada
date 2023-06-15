import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PrituzbaService } from './prituzba.service';
import { prituzbaKorisnikaDto, prituzbaOglasDto } from 'src/dto';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('prituzba')
export class PrituzbaController 
{
    constructor(private prituzbeService:PrituzbaService){}
    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.USER)
    @UseGuards(RolesGuard)
    @Post("prijaviKorisnika/:id")
    prijaviKorisnika(@Body() dtoPrituzba:prituzbaKorisnikaDto, @GetUser() user:User)
    {
        return this.prituzbeService.prijaviKorisnika(dtoPrituzba,user);
    }
    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.USER)
    @UseGuards(RolesGuard)
    @Post("prijaviOglas")
    prijaviOglas(@Body() dtoPrituzba:prituzbaOglasDto, @GetUser() user:User)
    {
        console.log("usao u prijaviOglas")
        console.log(dtoPrituzba);
        return this.prituzbeService.prijaviOglas(dtoPrituzba,user);
    }

    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Get('prijave')
    prijave(){
        return this.prituzbeService.prijave();
    }

    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.ADMIN)
    @UseGuards(RolesGuard)
    @Put('ResenaPrijava/:idPrijave/:ishod')
    resenaPrijava(@Param("idPrijave") idPrijave:string, @Param('ishod') ishod: string, @GetUser() user:User)
    {
        return this.prituzbeService.ResenaPrijava(user.id, idPrijave, ishod);
    }
}
