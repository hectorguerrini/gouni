import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { Api } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class ListaService {


  api: Api = new Api();

  constructor(public http: HttpClient) {
  }

  getLista(chave: string, nome: string) {
    const url = this.api.url + chave;
    const body = new URLSearchParams();

    body.set('nome', nome);

    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }
  getUniversidade(chave: string, id: string, user?: string) {
    const url = `${this.api.url}${chave}/${id}${user ? `/${user}` : '' }`;

    return this.http.post(url, '', {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }
}
