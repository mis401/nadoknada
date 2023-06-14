
export interface FullUserInfo {
    username: string;
    password?: string;
    hash:string;
    token: string;
    ime: string;
    prezime:string;
    grad:string;
    datum_rodjenja:Date;
    datum_registracije:Date;
    broj_telefona:string;
    email:string;
}