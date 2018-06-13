import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private urlApi = 'http://hector.local/gouniapi/';

  constructor(public http: HttpClient) {}

  updateUsuario(chave: string, usuario: string, senha: string, nome: string, email: string, dt_nasc: string, tipo: string) {
    const url = this.urlApi + chave;
    const body = new URLSearchParams();

    body.set('usuario', usuario);
    body.set('pw', senha);
    body.set('nome', nome);
    body.set('email', email);
    body.set('dt_nasc', dt_nasc);
    body.set('tipo', tipo);

    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }

  loginUsuario(chave: string, email: string, senha: string) {
    const url = this.urlApi + chave;
    const body = new URLSearchParams();

    body.set('email', email);
    body.set('pw', senha);


    return this.http.post(url, body.toString(), {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      )
    });
  }


}
