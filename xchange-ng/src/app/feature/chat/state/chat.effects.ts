import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ChatService } from "../services/chat.service";
import { loadChat, loadChatSuccess } from "./chat.actions";
import { map, switchMap } from "rxjs";

@Injectable()
export class ChatEffects {
    constructor(private actions$: Actions, private chatService: ChatService) {}

    loadChat$ = createEffect( () => this.actions$.pipe(
        ofType(loadChat),
        switchMap((action) => this.chatService.loadMessages(action.chat).pipe(
            map((messages) => loadChatSuccess({messages})),
        ))
    ))


}
