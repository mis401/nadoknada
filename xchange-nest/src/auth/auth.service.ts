import { Controller, ForbiddenException, HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { TokenDto, UserAuthLogin, UserAuthSignInDto, UserIzmenaDto } from "../dto";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon from "argon2";
import { User } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()

export class AuthService
{
    constructor(
        private prismaS:PrismaService,
        private jwt:JwtService,
        private configS:ConfigService
        ){}

    async signup(dtoUser:UserAuthSignInDto)
    {
        const hash=await argon.hash(dtoUser.password);
        try
        {
            const user=await this.prismaS.user.create({
                data:{ 
                    username: dtoUser.username,
                    hash: hash,
                    ime:dtoUser.ime,
                    prezime:dtoUser.prezime,
                    datum_rodjenja:dtoUser.datum_rodjenja,
                    datum_registracije:dtoUser.datum_registracije,
                    email:dtoUser.email,
                    broj_telefona:dtoUser.broj_telefona,
                    grad:dtoUser.grad,
                    role:"user",
                },
            });
            return this.signToken(user.id,user.username, user.role);
        }
        catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError)
            {
                if(error.code==="P2002") // da hvata samo ako se javlja duplikat  NE RADI ne ulazi u catch
                {
                    throw new ForbiddenException("Username is used");
                }
            }
            throw error;
        }
    }
    async login(dtoUser: UserAuthLogin)
    {
        const user = await this.prismaS.user.findUnique({
                where:{
                    username: dtoUser.username,
                }
            });
        
        if(!user)
        {
            throw new ForbiddenException("User not found");
        }
        const trazeni=await argon.verify(
            user.hash,
            dtoUser.password
            );
        if(!trazeni)
        {
            throw new ForbiddenException("Incorect password");
        }
        return this.signToken(user.id,user.username, user.role);
    }
    
    async signToken(userId:string,username:string, role: string):Promise<{accessToken:string, exp: Date}>
    {
        const payload : TokenDto ={
            sub:userId,
            username,
            role
        }
        const secret =this.configS.get("JWT_SECRET");

        const token=await this.jwt.signAsync(payload,
            {
                expiresIn: "180m",
                secret:secret,
            });
        return {accessToken: token, exp: new Date((new Date()).getTime() + 180*60000)};
    }
    
    @HttpCode(HttpStatus.OK)
    async obrisi(id: string)
    {
        const prijavljenNaOglase=await this.prismaS.oglas.findMany({ 
            where: { 
                pretplaceniKorisnici: { 
                    some: { 
                        id
                    }
                }
            }, 
        });
        await Promise.all( prijavljenNaOglase.map((oglas) => this.prismaS.oglas.update({ 
            where: { 
                id: oglas.id 
            }, 
            data: { 
                pretplaceniKorisnici: { disconnect: { id } } 
            }, 
        })));
        try
        {         
            const obrisi=await this.prismaS.user.delete({ 
                where: { 
                    id 
                }, 
            });
        }
        catch(error)
        {
            console.log(error);
        }
    }

    async izmeniUsera(user:User,dtoUser: UserIzmenaDto)
    {
        console.log(dtoUser);
        let hash = null;
        if(dtoUser.password != undefined && dtoUser.password != null && dtoUser.password != "")
            hash = await argon.hash(dtoUser.password);
        try
        {
            const newUser=await this.prismaS.user.update({
                where:{
                    id: user.id
                },
                data:{
                    username: dtoUser.username,
                    hash: hash?? user.hash,
                    ime:dtoUser.ime,
                    prezime:dtoUser.prezime,
                    datum_rodjenja:dtoUser.datum_rodjenja,
                    datum_registracije:dtoUser.datum_registracije,
                    email:dtoUser.email,
                    broj_telefona:dtoUser.broj_telefona,
                    grad:dtoUser.grad,
                    role:"user",
                },
            });
            return newUser;
        }
        catch(error)
        {
            if(error instanceof PrismaClientKnownRequestError)
            {
                if(error.code==="P2002") // da hvata samo ako se javlja duplikat  NE RADI ne ulazi u catch
                {
                    throw new ForbiddenException("Username is used");
                }
            }
            throw error;
        }
    }
}