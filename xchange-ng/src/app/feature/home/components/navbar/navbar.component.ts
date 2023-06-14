import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Oglas } from 'src/app/feature/oglas/models/oglas.model';
import { pretraziOglase } from 'src/app/feature/oglas/state/oglas.actions';
import { OglasState } from 'src/app/feature/oglas/state/oglas.state';
import { loadUserToken, logoutUser } from 'src/app/feature/user/state/user.actions';
import { selectUser } from 'src/app/feature/user/state/user.selector';
import { UserState } from 'src/app/feature/user/state/user.state';
import jwt_decode from 'jwt-decode';
import { JWT } from 'src/app/feature/user/models/jwt.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
    user: string = '';
    jwt : JWT = {
      sub: '',
      username: '',
      iat: 0,
      exp: 0,
      role: ''
    };

    private userSub : Subscription = new Subscription();
    constructor(private userStore: Store<UserState>, private oglasiStore: Store<OglasState>, private router: Router){}
    imeOglasa: string = '';
    ngOnInit(): void {
      this.initSubs();
    }
    ngOnDestroy(): void {
      this.userSub.unsubscribe();
    }


    private initSubs(){
      this.initUserSub();
    }
    private initUserSub(){
      this.userSub = this.userStore.select(selectUser).subscribe({
        next: (user) => {

            console.log("navbar dobio "+user + "test")
            this.user = user;
            this.jwt = jwt_decode<JWT>(this.user);

        }
      })
    }
    pretraziOglase(){
      console.log(`Ajeee ${this.imeOglasa}`);
      let ime = this.imeOglasa;
      this.oglasiStore.dispatch(pretraziOglase({kategorija: '', oglas: ime}));
      this.router.navigate(['/home']);
    }
    logOut(){
      this.userStore.dispatch(logoutUser({user: this.user}));
      this.router.navigate(['/home']);
      console.log(this.user)
    }
    

}
