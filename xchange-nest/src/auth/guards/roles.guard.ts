import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "../role.enum";
import jwtDecode from "jwt-decode";
import { TokenDto } from "src/dto";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> 
    {
        
        const requireRoles = this.reflector.getAllAndOverride<Role[]>("role",[
            context.getHandler(),
            context.getClass(),
        ]);
        const req = context.switchToHttp().getRequest(); 
        if(!requireRoles)
        {
            return true;
        }
        let jwt = req.headers.authorization.slice(7);
        const payload : TokenDto = jwtDecode(jwt);
        return requireRoles.some((role)=> role.includes(payload.role));
    }
}