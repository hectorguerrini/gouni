import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ListaService } from '../../services/lista.service';
import { AvalService } from '../../services/aval.service';
import { AuthService } from '../../auth.service';

import { Data } from '../../models/data';
import { MessageComponent } from '../../dialogs/message/message.component';
@Component({
  selector: 'app-universidade',
  templateUrl: './universidade.component.html',
  styleUrls: ['./universidade.component.css']
})
export class UniversidadeComponent implements OnInit {

  universidade: any;
  tipo: string;

  constructor(private acRouter: ActivatedRoute, private list: ListaService, private router: Router,
    private avalService: AvalService, private user: AuthService, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.acRouter.params.subscribe( params => {
      if ( params.id > 0) {
        this.tipo = params.tipo;
        if (params.tipo === 'curso') {
          this.getCurso(params.id);
        } else if (params.tipo === 'universidade') {
          this.getUniversidade(params.id);
        }
      } else {
        this.router.navigate(['/gouni/lista/']);
      }


    });
  }

  setAval(aval) {
    if (this.user.isLoggedIn) {
      this.universidade.avaliacao = aval;
    } else {
      this.popup('login', 'Precisa estar cadastrado para usar essa funcionalidade. Efetue o login para continuar');
    }

  }

  updateAval() {
    if (this.user.isLoggedIn) {
      this.avalService.updateAval(`avaliacao/${this.tipo}`, this.user.idLogged, this.universidade.id,
        this.universidade.avaliacao.toString(), this.universidade.comentario
      ).subscribe((data: Data) => {
        if (data.jsonRetorno.length > 0) {
          this.popup('success', 'Avaliação computada com sucesso.');
        } else {
          this.popup('error', 'Erro para enviar avaliação, Tente Novamente mais tarde.');
        }

      });
    } else {
      this.popup('login', 'Precisa estar cadastrado para usar essa funcionalidade. Efetue o login para continuar');
    }
  }
  popup(status, message) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '260px';
    dialogConfig.data = {status: status, message: message};
    const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('this is result: ' + result);
    });

  }



  getUniversidade(id) {
    if (this.user.isLoggedIn) {
      this.list.getUniversidade('universidade', id, this.user.idLogged)
      .subscribe((data: Data) => {
        if (data.jsonRetorno.length > 0 ) {
          this.universidade = data.jsonRetorno[0];
          console.log(this.universidade);
        } else {
          this.universidade = [];
        }
      });
    } else {
      this.list.getUniversidade('universidade', id)
      .subscribe((data: Data) => {
        if (data.jsonRetorno.length > 0 ) {
          this.universidade = data.jsonRetorno[0];
          console.log(this.universidade);
        } else {
          this.universidade = [];
        }
      });
    }

  }
  getCurso(id) {
    if (this.user.isLoggedIn) {
      this.list.getUniversidade('curso', id, this.user.idLogged)
      .subscribe((data: Data) => {
        if (data.jsonRetorno.length > 0 ) {
          this.universidade = data.jsonRetorno[0];
          console.log(this.universidade);
        } else {
          this.universidade = [];
        }
      });
    } else {
      this.list.getUniversidade('curso', id)
      .subscribe((data: Data) => {
        if (data.jsonRetorno.length > 0 ) {
          this.universidade = data.jsonRetorno[0];
          console.log(this.universidade);
        } else {
          this.universidade = [];
        }
      });
    }

  }
}
