import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: boolean;
  user: string;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.logged = this.auth.isLogged;
    if (this.logged) {
      this.user = this.auth.userLogged;
    }
  }

}
