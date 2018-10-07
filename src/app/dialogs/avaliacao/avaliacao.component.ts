import { Component, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Avaliacao } from '../../models/avaliacacao';
import { AvalService } from '../../services/aval.service';
import { AuthService } from '../../auth.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {

  nota = 0;
  maxNota = 5;
  aval = new Avaliacao();
  campos: Array<String>;
  constructor(
    public dialogRef: MatDialogRef<AvaliacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private avalService: AvalService, private user: AuthService
  ) { }

  ngOnInit() {
    this.campos = Object.keys(this.aval);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAval() {
    this.avalService.updateAval(`avaliacao/universidade`, this.user.idLogged, this.data.id, this.aval)
    .subscribe((data: Data) => {
      if (data.jsonRetorno.length > 0) {
        this.dialogRef.close({ status: 'success', message: 'Avaliação computada com sucesso.' });
      } else {
        this.dialogRef.close({ status: 'error', message: 'Erro para enviar avaliação, Tente Novamente mais tarde.' });
      }
    });
  }

}
