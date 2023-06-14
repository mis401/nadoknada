export interface Oglas{
    id:          string       
    naziv:       string
    kvalitet:    string
    brojPoseta:  number          
    opis:        string
    datumKreiranja: Date
    ponuda:      string
    aktivanOglas: boolean 
    resenOglas:  boolean 
    obrisanOglas: boolean 
    datumResavanja:  Date
    datumBrisanja:   Date
    razlogBrisanja:  string
    kreiraoKorisnikId?:string;
    kreiraoKorisnikUsername?:string;
    kategorijaIds?:string[];
    slike?: File[] | null;
    pretplacujeSeIds?: string[]
}
