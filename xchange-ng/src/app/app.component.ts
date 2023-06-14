import { Component, OnInit } from '@angular/core';
import { AppState } from './state/app.state';

import { loadUserToken, logoutUser } from './feature/user/state/user.actions';
import { Subscription, timer } from 'rxjs';
import { selectUser } from './feature/user/state/user.selector';
import jwt_decode from 'jwt-decode';
import { AuthToken } from './feature/user/models/authtoken.model';
import { UserState } from './feature/user/state/user.state';
import { Store } from '@ngrx/store';
import { JWT } from './feature/user/models/jwt.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'xchange-ng';
  user: string = '';
  tokenExpSub : Subscription = new Subscription();
  userSub : Subscription = new Subscription();
  timerSub: Subscription = new Subscription();
  constructor(private userStore: Store<UserState>) { }




  private expirationCheck(user: string){
    if (user !== ''){
      const exp = jwt_decode<JWT>(user).exp;
      const iat = jwt_decode<JWT>(user).iat;
      console.log(jwt_decode<JWT>(user));
      console.log(Date.now() - exp*1000);
      if (Date.now() - exp*1000 > 0) {
        this.userStore.dispatch(logoutUser({user: this.user}));
        alert("Izlogovani ste jer Vam je istekla sesija. Molimo ulogujte se ponovo.");
      }
      else{
        this.timerSub = timer(exp*1000 - Date.now()).subscribe({
          next: () => {
            console.log("timer");
            this.userStore.dispatch(logoutUser({user: this.user}));
              alert("Izlogovani ste jer vam je istekla sesija. Molimo ulogujte se ponovo.");
          }
        })
      }
    }
  }

  ngOnInit(): void {
    if (this.user === ''){
      this.user = localStorage.getItem('token') || '';
      if (this.user !== ''){
        this.userStore.dispatch(loadUserToken({token: this.user}));
      }
    }
    this.userSub = this.userStore.select(selectUser).subscribe({
      next: (user) => {
        this.expirationCheck(user);
        console.log("App component: " + this.user);
      }
    })
  }
}
