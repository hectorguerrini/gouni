import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';
import { Data } from '../../models/data';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  constructor(private service: UserService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.login = {};
  }

  loginUsuario() {
    this.service.loginUsuario('loginUsuario', this.login.email, this.login.senha)
    .subscribe((data: Data) => {
      if (data.message) {
        this.auth.setLogged(true, data.jsonRetorno[0].email);
        this.router.navigate(['/']);
      }

    });

  }
}
