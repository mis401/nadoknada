import { Component, OnDestroy, OnInit } from '@angular/core';
import { Credentials } from '../../models/credentials.model';
import { UserState } from '../../state/user.state';
import { Store } from '@ngrx/store';
import { loginUser } from '../../state/user.actions';
import { Observable, Subscription, map } from 'rxjs';
import { selectUser } from '../../state/user.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  user: Credentials = {username: '', password: '', token: ''};
  private userSub: Subscription = new Subscription();

  constructor(private store: Store<UserState>, private router: Router) { }

  ngOnInit() {
    this.initSubscriptions();
  }
  
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  private initSubscriptions(){
    this.userSub = this.store.select(selectUser).pipe(
    ).subscribe(
      {
        next: (token) => {
          if (token !== ''){
            localStorage.setItem('token', token);
            this.router.navigate(['/home']);
          }
        }
      }
    )
  }
  

  onSubmit(): void {
    console.log(this.user);
    this.store.dispatch(loginUser({user: this.user}));
  }
  
}
