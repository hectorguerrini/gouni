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
    // this.urlApi = this.api.url;
  }

  getUniversidade(chave: string, nome: string) {
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
}
