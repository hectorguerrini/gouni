import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: Observable<boolean>;
  user:  Observable<string>;
  constructor(private auth: AuthService, private router: Router) {
    console.log('Constructor NavBar');
  }

  ngOnInit() {
    console.log('ngOnInit NavBar');
    this.logged = this.auth.isLoggedIn;
    console.log(this.logged);

    this.user = this.auth.userLogged;

  }

  signOut() {
    this.auth.setLogged(false, null);
    this.router.navigate(['/']);

  }

}
