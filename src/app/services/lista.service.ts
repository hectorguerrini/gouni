import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { Api } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class ListaService {


  api: Api = new Api(isDevMode());

  constructor(public http: HttpClient) {
  }

  getCombo(chave: string, combo: string, id: string) {
    const url = `${this.api.url}${chave}/${combo}`;
    const body = new URLSearchParams();

    body.set('id', id);

    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
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
  getUniversidade(chave: string, id: string, order: number, user?: string) {
    const url = `${this.api.url}${chave}/${id}${user ? `/${user}` : '' }`;
    const body = new URLSearchParams();

    body.set('order', order.toString());
    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }
  getDetalhes(chave: string, id_uni: string, id_curso: string) {
    const url = `${this.api.url}${chave}/${id_uni}/${id_curso}`;

    return this.http.get(url, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }
}
