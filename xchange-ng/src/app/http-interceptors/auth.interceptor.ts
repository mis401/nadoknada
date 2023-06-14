import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../feature/user/services/auth.service";
import { AppState } from "../state/app.state";
import { Store } from "@ngrx/store";
import { selectUser } from "../feature/user/state/user.selector";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private authService: AuthService, private store: Store<AppState>) {}
    intercept(req: HttpRequest<any>, next: HttpHandler){
        let token : string = '';
        this.store.select(selectUser).subscribe({
            next: (user) => {
                token = user;
            }
        })
        const authReq = req.clone({
            setHeaders: { Authorization: `Bearer ${token}`}
        });
        return next.handle(authReq);
    }
}