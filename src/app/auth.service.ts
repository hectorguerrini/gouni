import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(JSON.parse(localStorage.getItem('logged') || 'false'));
  // private loggedStatus = JSON.parse(localStorage.getItem('logged') || 'false');
  private userLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(localStorage.getItem('user') || '');
  constructor() { }


  setLogged(value: boolean, user: string) {
    // this.loggedStatus = value;
    localStorage.setItem('logged', value.toString());
    user ? localStorage.setItem('user', user) : localStorage.removeItem('user');
    this.loggedIn.next(value);
    this.userLoggedIn.next(user);

  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get userLogged() {
    return this.userLoggedIn.asObservable();
  }

}
