import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oglas } from '../models/oglas.model';
import { Observable } from 'rxjs';
import { Kategorija } from '../models/kategorija.model';
import { envLocal, envNet } from 'src/env/index';
import { Ponuda } from '../models/ponuda.model';
import { Prituzba } from '../models/prituzba.model';
import { PrituzbaDTO } from '../../korisnicka-podrska/models/prituzbaDTO.model';


@Injectable({
  providedIn: 'root'
})
export class OglasService {
  private BASE_URL = `${envLocal.api}/oglas`;
  constructor(private http: HttpClient) { }
  private host = envLocal.api;
  // vratiTopOglase(): Oglas[] {
    
  // }

  vratiOglase(imeOglasa: string, kategorija: string) : Observable<Oglas[]> {
    console.log(`Gadjam api za ${imeOglasa}`);

    const url = `${this.BASE_URL}/pretraziOglas`;
    console.log(url);

    return this.http.get<Oglas[]>(`${url}?kategorija=${kategorija}&naslov=${imeOglasa}`);
  };

    zapratiOglas(oglas: Oglas) : Observable<Oglas> {
    const url = `${this.BASE_URL}/pretplatiSeNaOglas/${oglas.id}`;
    return this.http.post<Oglas>(url, {});
  }
  
  dodajOglas(oglas: FormData) : Observable<Oglas> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', '*/*');
    return this.http.post<Oglas>(`${this.BASE_URL}/dodajOglas`, oglas, {headers});
  }


  vratiSveKategorije(){
    return this.http.get<Kategorija[]>(`${this.BASE_URL}/kategorije`);
  }

  prijaviOglas(oglas: string, razlog: string) : Observable<PrituzbaDTO> {
    const url = `${this.host}/prituzba/prijaviOglas`;
    const prituzba : PrituzbaDTO = {
      id:'',
      ishod: 'neresen',
      tema: razlog,
      kojiOglasSePrijavljuje: oglas,
    }
    console.log(prituzba);
    return this.http.post<PrituzbaDTO>(url, {tema: razlog, kojiOglasSePrijavljuje: oglas})
  }

  ponudi(oglas: string, ponuda: string){
    const url = `${this.BASE_URL}/ponudiNaOglas`;
    console.log(`Servis gadjam sa ponudom ${ponuda}`);
    return this.http.post<Oglas>(url, {oglas: oglas, ponuda: ponuda})
  }

  test(){
    this.http.get('http://localhost:3002/users/me').subscribe({next: (data) => {console.log(data)}})
  }

  vidjen(oglas: string){
    this.http.put(`${this.BASE_URL}/vidjen`, {oglas: oglas}).subscribe({next: (data) => {console.log(data)}})
  }

  getMojiOglasi(){
    return this.http.get<Oglas[]>(`${this.BASE_URL}/mojiOglasi`);
  }

  getZapraceniOglasi(){
    return this.http.get<Oglas[]>(`${this.BASE_URL}/zapraceniOglasi`);
  }

  vratiOglaseKategorije(kategorija: Kategorija){
    return this.http.get<Oglas[]>(`${this.BASE_URL}/oglasiKategorije?kategorija=${kategorija.id}`);
  }

  obrisiOglas(oglas: string){
    return this.http.delete(`${this.BASE_URL}/obrisiOglas/${oglas}`);
  }


}
