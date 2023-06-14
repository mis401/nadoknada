import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    "jwt", // indentifikacioni kljuc
    )
{
    constructor(
        configS:ConfigService,
        private prismaS:PrismaService
        )
    {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configS.get("JWT_SECRET"),
        })
    }
    async validate(payload:{
        sub: string;
        username: string;
    })
    {
        const user= await this.prismaS.user.findUnique({
            where:{
                id:payload.sub,
            },
        });
        delete user.hash;
        return user;
    }
}