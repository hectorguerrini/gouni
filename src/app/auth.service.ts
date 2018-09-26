import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('logged') || 'false'));
  // private loggedStatus = JSON.parse(localStorage.getItem('logged') || 'false');
  private userLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('user') || '');
  private idLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('id') || '');
  constructor() { }


  setLogged(value: boolean, user: string, id: string) {
    // this.loggedStatus = value;
    localStorage.setItem('logged', value.toString());
    user ? localStorage.setItem('user', user) : localStorage.removeItem('user');
    id ? localStorage.setItem('id', id) : localStorage.removeItem('id');
    this.loggedIn.next(value);
    this.userLoggedIn.next(user);
    this.idLoggedIn.next(id);
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userLogged() {
    return this.userLoggedIn.asObservable();
  }

  get idLogged() {
    return localStorage.getItem('id');
  }
}
