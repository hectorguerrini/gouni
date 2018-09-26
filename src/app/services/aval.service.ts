import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import { Api } from '../models/api';

@Injectable({
  providedIn: 'root'
})
export class AvalService {

  api: Api = new Api();
  constructor(public http: HttpClient) { }

  updateAval(chave: string, user: string, id: string, aval: string, comentario: string) {
    const url = `${this.api.url}${chave}/${user}`;
    const body = new URLSearchParams();

    body.set('id', id);
    body.set('avaliacao', aval);
    body.set('comment', comentario);

    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }
}
