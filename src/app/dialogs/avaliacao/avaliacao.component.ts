import { Component, ViewChild, OnInit , Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { Avaliacao } from '../../models/avaliacacao';
import { AvalService } from '../../services/aval.service';
import { AuthService } from '../../auth.service';
import { Data } from '@angular/router';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.component.html',
  styleUrls: ['./avaliacao.component.css']
})
export class AvaliacaoComponent implements OnInit {
  @ViewChild('instance') instance: NgbTypeahead;

  model: string;
  nota = 0;
  maxNota = 5;
  aval = new Avaliacao();
  campos: Array<String>;

  focus = new Subject<string>();
  click = new Subject<string>();

  constructor(
    public dialogRef: MatDialogRef<AvaliacaoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private avalService: AvalService, private user: AuthService, private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.campos = Object.keys(this.aval);
    if (this.data.tipo === 'curso') {
      this.aval.curso = this.data.id;
    } else if (this.data.tipo === 'universidade') {
      this.aval.universidade = this.data.id;
    }

    this.model = '';
  }



  search = (text: Observable<string>) => {
    const debouncedText$ = text.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(term => (term === '' ? this.data.filhos.map(filho => filho.nome)
            : this.data.filhos.filter(v => v.nome.toLowerCase().indexOf(term.toLowerCase()) > -1).map(filho => filho.nome)
          ).slice(0, 10)
        )
      );
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  updateAval() {
    if (this.model !== '' ) {
      if (this.data.tipo === 'curso') {
        this.aval.universidade = this.data.filhos.find(filho => filho.nome === this.model).id_tipo;
      } else if (this.data.tipo === 'universidade') {
        this.aval.curso = this.data.filhos.find(filho => filho.nome === this.model).id_tipo;
      }

      this.avalService.updateAval(`avaliacao/universidade`, this.user.idLogged, this.aval)
      .subscribe((data: Data) => {
        if (data.jsonRetorno.length > 0) {
          this.popup('success', 'Avaliação computada com sucesso.' );
          this.dialogRef.close();
        } else {
          this.popup('error', 'Erro para enviar avaliação, Tente Novamente ' );
        }
      });
    } else {
      this.popup('error', 'Preencha todos os campos obrigatorios');
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

}
