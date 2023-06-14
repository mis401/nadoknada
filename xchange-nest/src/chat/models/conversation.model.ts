import { Poruka } from "@prisma/client"
import { Message } from "./message.model"

export interface Conversation {
    id: String
    userIds: String[],
    poruke: Message[],
    vremeIzmene: Date,
    datumPocetka: Date,
    usernames: String[],
}