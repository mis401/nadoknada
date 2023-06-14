export interface Ponuda {
    id: string
    Naslov: string
    vrsta: string
    opis: string
    slika: string | null
    koJePoslaoPonuduId: string
    oglasId: string
    prihvacenaNaOglasId: string | null
  }