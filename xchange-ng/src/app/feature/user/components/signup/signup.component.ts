import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credentials } from '../../models/credentials.model';
import { FullUserInfo } from '../../models/fulluserinfo.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/user.state';
import { Router } from '@angular/router';
import { selectFullUser, selectUser } from '../../state/user.selector';
import { signupUser } from '../../state/user.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  user: FullUserInfo = {} as FullUserInfo;
  private userSub: Subscription = new Subscription();
  private initSubs(){
    this.initUserSub();
  }
  private initUserSub(){
    this.userSub = this.store.select(selectUser).subscribe({
      next: (user) => {
        if (user != ''){
          this.user.token = user;
          localStorage.setItem('token', this.user.token);
          this.router.navigate([`/home`]);
        }
      }
    });
  }
  constructor(private store: Store<UserState>, private router: Router) { }

  ngOnInit() {
    this.initSubs();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onSubmit(): void {
    console.log(this.user);
    this.user.datum_rodjenja = new Date(this.user.datum_rodjenja);
    this.store.dispatch(signupUser({user: this.user}));
    localStorage.setItem('token', this.user.token);
  }
}
