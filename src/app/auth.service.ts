import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedStatus = JSON.parse(localStorage.getItem('logged') || 'false');

  constructor() { }


  setLogged(value: boolean, user: string) {
    this.loggedStatus = value;
    localStorage.setItem('logged', 'true');
    localStorage.setItem('user', user);
  }

  get isLogged() {
    return JSON.parse(localStorage.getItem('logged') || this.loggedStatus.toString());
  }
  get userLogged() {
    return localStorage.getItem('user');
  }
}
