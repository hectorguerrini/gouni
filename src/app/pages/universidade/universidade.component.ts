import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { ListaService } from '../../services/lista.service';
import { AvalService } from '../../services/aval.service';
import { AuthService } from '../../auth.service';

import { Data } from '../../models/data';
import { MessageComponent } from '../../dialogs/message/message.component';
import { AvaliacaoComponent } from '../../dialogs/avaliacao/avaliacao.component';
import { Dialogdata } from '../../models/dialogdata';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-universidade',
  templateUrl: './universidade.component.html',
  styleUrls: ['./universidade.component.css']
})
export class UniversidadeComponent implements OnInit {

  universidade: any;
  tipo: string;
  logged: Observable<boolean>;
  maxNota = 5;

  constructor(private acRouter: ActivatedRoute, private list: ListaService, private router: Router,
    private user: AuthService, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.logged = this.user.isLoggedIn;
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
    if (this.user.isLogged) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '480px';
      dialogConfig.height = '80%';
      dialogConfig.data = this.universidade;
      const dialogRef = this.dialog.open(AvaliacaoComponent, dialogConfig);

      dialogRef.afterClosed().subscribe((result) => {
        this.ngOnInit();
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
    if (this.user.isLogged) {
      this.list.getUniversidade('universidade', id, this.user.idLogged)
        .subscribe((data: Data) => {
          if (data.jsonRetorno.length > 0) {
            this.universidade = data.jsonRetorno[0];
            this.universidade.tipo = this.tipo;
          } else {
            this.universidade = [];
          }
        });
    } else {
      this.list.getUniversidade('universidade', id)
        .subscribe((data: Data) => {
          if (data.jsonRetorno.length > 0) {
            this.universidade = data.jsonRetorno[0];
            this.universidade.tipo = this.tipo;
          } else {
            this.universidade = [];
          }
        });
    }
  }
  getCurso(id) {
    if (this.user.isLogged) {
      this.list.getUniversidade('curso', id, this.user.idLogged)
        .subscribe((data: Data) => {
          if (data.jsonRetorno.length > 0) {
            this.universidade = data.jsonRetorno[0];
            this.universidade.tipo = this.tipo;
          } else {
            this.universidade = [];
          }
        });
    } else {
      this.list.getUniversidade('curso', id)
        .subscribe((data: Data) => {
          if (data.jsonRetorno.length > 0) {
            this.universidade = data.jsonRetorno[0];
            this.universidade.tipo = this.tipo;
          } else {
            this.universidade = [];
          }
        });
    }
  }


  ir(item) {
    if (this.tipo === 'curso') {
      this.router.navigate(['/gouni/universidade/', item.id_tipo]);
    } else if (this.tipo === 'universidade') {
      this.router.navigate(['/gouni/curso/', item.id_tipo]);
    }
  }

}
