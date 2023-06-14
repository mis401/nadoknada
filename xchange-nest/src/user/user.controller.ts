import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { UserService } from './user.service';

@Controller('users')
export class UserController 
{
    constructor(private userService:UserService){}
    @UseGuards(AuthGuard("jwt"))
    @Get("me")
    getMe(@GetUser() user:User)
    {
        return user;
    }
    @Get("sviKomentari/:id")
    getKomentari(@Param("id") id:string)
    {
        return this.userService.getKomentari(id);
    }
    @Get("sviOglasi/:id")
    getOglasi(@Param("id") id:string)
    {
        return this.userService.getOglasi(id);
    }
    @Get("svePrituzbe/:id")
    getPrituzbe(@Param("id") id:string)
    {
        return this.userService.getPrituzbe(id);
    }
    @Get("user/:id")
    getUser(@Param("id") id:string)
    {
        return this.userService.getUser(id);
    }
    @Get("svePoslatePonude/:id")
    getPoslatePonude(@Param("id") id:string)
    {
        return this.userService.getPoslatePonude(id);
    }
    // da izlisista sve aktivne ili resene oglase
    @Get("sviAktivniOglasi/:id")
    getAktivneOglase(@Param("id") id:string)
    {
        return this.userService.getAktivneOglase(id);
    }
    @Get("sviReseniOglasi/:id")
    getReseneOglase(@Param("id") id:string)
    {
        return this.userService.getReseneOglase(id);
    }
}
