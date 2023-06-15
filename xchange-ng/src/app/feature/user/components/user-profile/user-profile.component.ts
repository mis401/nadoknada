import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/user.state';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { FullUserInfo } from '../../models/fulluserinfo.model';
import { selectError, selectFullUser, selectUser } from '../../state/user.selector';
import { deleteUser, loadFullUser, updateUser } from '../../state/user.actions';
import { format } from 'date-fns';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import jwtDecode from 'jwt-decode';
import { JWT } from '../../models/jwt.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(private service: AuthService, private store: Store<UserState>, private router: Router, public dialog: MatDialog) {}
  fullUserSub: Subscription = new Subscription();
  fullUser : FullUserInfo = {
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
  };
  editable: boolean = false;
  hide : boolean = true;
  userToken: string = '';
  onDelete(){
    const deleteDialog = this.dialog.open(UserDeleteDialogComponent);
    deleteDialog.afterClosed().subscribe(result => {
      if (result){
        let userId = jwtDecode<JWT>(this.userToken).sub;
        this.store.dispatch(deleteUser({user: userId}));
        this.router.navigate(['/home']);
      }
    });
  }

  onEdit(){
    this.editable = true;
  }
  onSubmit(){
    console.log(this.fullUser);
    this.store.dispatch(updateUser({user: this.fullUser}))
    this.store.select(selectError).pipe(take(1)).subscribe({
      next: (error) => {
        if (error != null){
          alert("Izmena nije uspela!");
        }
        else
        {
          alert("Izmena uspela!");
          this.editable = false;
        }
      }
    });
  }



  
  ngOnInit(): void {
    this.initSubs();
    this.editable = false;
  }
  private initSubs(){
    this.fullUserSub = this.store.select(selectFullUser).subscribe({
      next: (fullUser) => {
        if (fullUser != null){
          this.fullUser = {...fullUser};
          console.log(this.fullUser);
        }
        else{
          this.store.dispatch(loadFullUser({token: ''}));
        }
      }
    });
    this.store.select(selectUser).pipe(take(1)).subscribe({
      next: (user) => {
        if (user != null){
          this.userToken = user;
          this.store.dispatch(loadFullUser({token: user}));
        }
        else{
          this.router.navigate(['/home']);
        }
      }
    });

  }
  ngOnDestroy(): void {
    this.fullUserSub.unsubscribe();
  }
  
}
