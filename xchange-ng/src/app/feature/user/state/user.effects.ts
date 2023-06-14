import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { loginUser, loginUserSuccess, loginUserFailed, signupUser, signupUserSuccess, signupUserFailed, logoutUser, logoutUserSuccess, loadUserToken, loadFullUser, loadFullUserSuccess, loadUserFailed } from "./user.actions";
import { catchError, map, of, switchMap, tap } from "rxjs";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

    loginUser$ = createEffect( () => this.actions$.pipe(
        ofType(loginUser),
        switchMap((action) => this.authService.logIn(action.user).pipe(
            tap((token) => console.log(token)),
            map((token) => loginUserSuccess({token: token.accessToken})),
            catchError((error) => of(loginUserFailed({error})))
        ))
    ))

    signupUser$ = createEffect( () => this.actions$.pipe(
        ofType(signupUser),
        switchMap((action) => this.authService.signUp(action.user).pipe(
            map((rcvtoken) => signupUserSuccess({token: rcvtoken.accessToken})),
            catchError((error) => of(signupUserFailed({error})))
        ))
    ))
    logOutUser$ = createEffect( () => this.actions$.pipe(
        ofType(logoutUser),
        switchMap((action) => {
            localStorage.removeItem('token');
            return of(logoutUserSuccess({message: 'User logged out'}));
        }),
    ))

    loadFullUser$ = createEffect( () => this.actions$.pipe(
        ofType(loadFullUser),
        switchMap((action) => this.authService.loadFullUser().pipe(
            map((user) => loadFullUserSuccess({user})),
            catchError((error) => of(loadUserFailed({error})))
        ))
    ))
}