import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { Api } from '../models/api';
import { Avaliacao } from '../models/avaliacacao';

@Injectable({
  providedIn: 'root'
})
export class AvalService {

  api: Api = new Api(isDevMode());
  constructor(public http: HttpClient) { }

  updateAval(chave: string, user: string, avaliacao: Avaliacao) {
    const url = `${this.api.url}${chave}/${user}`;
    // const body = new URLSearchParams();

    // body.set('id', id);
    // body.set('avaliacao', aval);
    // body.set('comment', comentario);

    return this.http.post(url, avaliacao, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/json'
      )
    });
  }
}
