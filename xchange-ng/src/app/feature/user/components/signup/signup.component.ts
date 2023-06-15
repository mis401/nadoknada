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

  user: FullUserInfo = {
    username: '',
    password: '',
    hash: '',
    token: '',
    ime: '',
    prezime: '',
    grad: '',
    datum_rodjenja: new Date(),
    datum_registracije: new Date(),
    broj_telefona: '',
    email: ''
  }

  private userSub: Subscription = new Subscription();
  private initSubs(){
    this.initUserSub();
  }
  private initUserSub(){

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
    this.router.navigate(['/home']);
  }
}
