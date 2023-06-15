import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envLocal } from 'src/env';
import { KomentarUser } from '../models/komentar-user.model';
import { Observable } from 'rxjs';
import { Komentar } from '../models/komentar.model';

@Injectable({
  providedIn: 'root'
})
export class KomentarService {

  constructor(private http: HttpClient) { }
  BASE_URL = `${envLocal.api}/komentar`;

  komentariNaKorisnika(id: string) : Observable<KomentarUser[]> {
    return this.http.get<KomentarUser[]>(`${this.BASE_URL}/sviKomentariNaKorisnika/${id}`);
  }

  dodajKomentar(komentar: Komentar) : Observable<Komentar>{
    return this.http.post<Komentar>(`${this.BASE_URL}/dodajKomentar`, {id: '', tekst: komentar.tekst, ocena: komentar.ocena, datumPostavljanja: komentar.datumPostavljanja, ostavioKomentar: komentar.userOstavioKomentarId, komeJeOstavljenKomentar: komentar.userkomeJeOstavljenKomentarId});
  }
}
