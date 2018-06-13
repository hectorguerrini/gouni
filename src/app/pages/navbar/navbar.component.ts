import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean;
  user: string;
  constructor(private auth: AuthService, private router: Router) {  }

  ngOnInit() {
    this.logged = this.auth.isLogged;
    if (this.logged) {
      this.user = this.auth.userLogged;
    }
  }

  signOut() {
    this.auth.setLogged(false, null);
    this.ngOnInit();
    this.router.navigate(['/home']);
  }

}
