import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { NbChatModule, NbFocusMonitor, NbStatusService } from '@nebular/theme';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { chatReducer } from './state/chat.reducers';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RouterModule } from '@angular/router';
import { KomentarModule } from '../komentar/komentar.module';
import { MatDialogModule } from '@angular/material/dialog';





@NgModule({
  declarations: [
    ChatListComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('chat', chatReducer),
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    NbChatModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
    KomentarModule,
    MatDialogModule,
  ],
  providers: [NbStatusService, NbFocusMonitor], 
})
export class ChatModule { }
