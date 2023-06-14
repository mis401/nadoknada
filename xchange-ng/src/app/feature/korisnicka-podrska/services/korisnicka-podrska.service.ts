import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prijava } from '../models/prijava.model';
import { envLocal } from 'src/env';

@Injectable({
  providedIn: 'root'
})
export class KorisnickaPodrskaService {
  BASE_URL = `${envLocal.api}/prituzba`
  constructor(private http: HttpClient) { }

  ucitajPrijave(){
    return this.http.get<Prijava[]>(`${this.BASE_URL}/prijave`);
  }

}
