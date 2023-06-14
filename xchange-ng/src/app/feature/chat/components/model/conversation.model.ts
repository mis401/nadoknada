
import { Message } from "./poruka.model"

export interface Conversation {
    id: string
    userIds: string[],
    poruke: Message[],
    vremeIzmene: Date,
    datumPocetka: Date,
    usernames: string[]
}