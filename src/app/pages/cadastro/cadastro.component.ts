import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../user.service';
import { Data } from '../../models/data';



@Component({
  selector: 'app-cadatro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastro: any;
  constructor(private service: UserService, private router: Router) {}

  ngOnInit() {
    this.cadastro = {};
  }

  updateUsuario() {

    this.service.updateUsuario(
      'updateUsuario',
      this.cadastro.usuario,
      this.cadastro.senha,
      this.cadastro.nome,
      this.cadastro.email,
      this.cadastro.dt_nasc,
      this.cadastro.tipo
    ).subscribe((data: Data) => {
      if (data.message) {
        this.router.navigate(['/home']);
      }
    });
  }
}
