import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PonudaService } from './ponuda.service';
import { PonudaDto } from 'src/dto';
import { retry } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('ponuda')
export class PonudaController 
{
    constructor(private ponudaService:PonudaService){}

    @Post("ponudi")
    posaljiPonudu(@Body() dto:PonudaDto)
    {
        return this.ponudaService.posaljiPonudu(dto);
    }
    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.ADMIN,Role.USER)
    @UseGuards(RolesGuard)
    @Delete("obrisi/:id")
    obrisi(@Param("id") id:string, @GetUser() user:User)
    {
        return this.ponudaService.obrisiPonudu(id,user);
    }
    //ne moze da se obrise ponuda resenog oglasa
}
