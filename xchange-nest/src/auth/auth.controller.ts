import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserAuthLogin, UserAuthSignInDto, UserIzmenaDto } from "../dto";
import { Roles } from "./decorator/roles.decorator";
import { Role } from "./role.enum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "./guards";
import { GetUser } from "./decorator";
import { User } from "@prisma/client";

@Controller("auth")
export class AuthController
{
    constructor(private authServise:AuthService){}
    @Post("signup")
    signup(@Body("") dtoUser:UserAuthSignInDto)
    {
        console.log({
            dto: dtoUser,
        })
        return this.authServise.signup(dtoUser);
    }

    @Post("login")
    login(@Body("") dtoUser:UserAuthLogin)
    {
        return this.authServise.login(dtoUser);
    }
    
    @Roles(Role.ADMIN)
    @Delete("obrisi/:id")
    obrisiAdmin(@Param("id") id:string)
    {
        return this.authServise.obrisi(id);
    }
    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.USER)
    @UseGuards(RolesGuard)
    @Delete("obrisi")
    obrisiUser(@GetUser() user:User)
    {
        return this.authServise.obrisi(user.id);
    }

    @UseGuards(AuthGuard("jwt"))
    @Roles(Role.USER)
    @UseGuards(RolesGuard)
    @Patch("izmeni")
    izmeniUser(@Body("") dtoUser:UserIzmenaDto,@GetUser() user:User)
    {
        return this.authServise.izmeniUsera(user,dtoUser);
    }

}