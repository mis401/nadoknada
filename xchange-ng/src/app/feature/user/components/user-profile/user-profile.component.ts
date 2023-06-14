import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../state/user.state';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FullUserInfo } from '../../models/fulluserinfo.model';
import { selectFullUser } from '../../state/user.selector';
import { loadFullUser } from '../../state/user.actions';
import { format } from 'date-fns';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  constructor(private service: AuthService, private store: Store<UserState>, private router: Router, public dialog: MatDialog) {}
  fullUserSub: Subscription = new Subscription();
  fullUser : FullUserInfo = {} as FullUserInfo;
  editable: boolean = false;
  hide : boolean = true;
  onDelete(){
    const deleteDialog = this.dialog.open(UserDeleteDialogComponent);
    deleteDialog.afterClosed().subscribe(result => {
      if (result){
        console.log('Delete confirmed');
      }
    });
  }

  onEdit(){
    this.editable = true;
  }
  onSubmit(){
    console.log(this.fullUser);

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
  }
  ngOnDestroy(): void {
    this.fullUserSub.unsubscribe();
  }
  
}
