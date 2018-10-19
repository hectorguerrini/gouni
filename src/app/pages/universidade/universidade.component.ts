import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { ListaService } from '../../services/lista.service';
import { AuthService } from '../../auth.service';

import { Data } from '../../models/data';
import { MessageComponent } from '../../dialogs/message/message.component';
import { AvaliacaoComponent } from '../../dialogs/avaliacao/avaliacao.component';

import { Observable } from 'rxjs';
import { Paginacao } from 'src/app/models/paginacao';
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
    position = 'before';
    sort = 2;
    reverse = false;
    listCompare = new Array<any>();
    paginacao: Paginacao;
    constructor(private acRouter: ActivatedRoute, private list: ListaService, private router: Router,
        private user: AuthService, private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.paginacao = new Paginacao;
        this.logged = this.user.isLoggedIn;
        this.acRouter.params.subscribe(params => {
            if (params.id > 0) {
                this.tipo = params.tipo;
                if (params.tipo === 'curso') {
                    this.getCurso(params.id);
                } else if (params.tipo === 'universidade') {
                    this.getUniversidade(params.id);
                }
            } else {
                this.router.navigate(['/gouni/lista/curso']);
            }


        });
    }


    sortBy(col) {
        this.reverse = !this.reverse;
        this.sort = col * (this.reverse ? -1 : 1);
        if (this.tipo === 'curso') {
            this.getCurso(this.universidade.id);
        } else if (this.tipo === 'universidade') {
            this.getUniversidade(this.universidade.id);
        }
    }

    popup(status, message) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.hasBackdrop = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '260px';
        dialogConfig.data = { status: status, message: message };
        const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            console.log('this is result: ' + result);
        });

    }



    getUniversidade(id) {
        if (this.user.isLogged) {
            this.list.getUniversidade('universidade', id, this.sort, this.user.idLogged)
                .subscribe((data: Data) => {
                    if (data.jsonRetorno.length > 0) {
                        this.universidade = data.jsonRetorno[0];
                        this.universidade.tipo = this.tipo;
                        this.paginacao.length = this.universidade.filhos.length;
                        this.paginacao.lista = this.universidade.filhos.slice(
                            this.paginacao.index * this.paginacao.pageSize,
                            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                        );
                    } else {
                        this.universidade = [];
                        this.paginacao.lista = [];
                    }
                });
        } else {
            this.list.getUniversidade('universidade', id, this.sort)
                .subscribe((data: Data) => {
                    if (data.jsonRetorno.length > 0) {
                        this.universidade = data.jsonRetorno[0];
                        this.universidade.tipo = this.tipo;
                        this.paginacao.length = this.universidade.filhos.length;
                        this.paginacao.lista = this.universidade.filhos.slice(
                            this.paginacao.index * this.paginacao.pageSize,
                            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                        );
                    } else {
                        this.universidade = [];
                        this.paginacao.lista = [];
                    }
                });
        }
    }
    getCurso(id) {
        if (this.user.isLogged) {
            this.list.getUniversidade('curso', id, this.sort, this.user.idLogged)
                .subscribe((data: Data) => {
                    if (data.jsonRetorno.length > 0) {
                        this.universidade = data.jsonRetorno[0];
                        this.universidade.tipo = this.tipo;
                        this.paginacao.length = this.universidade.filhos.length;
                        this.paginacao.lista = this.universidade.filhos.slice(
                            this.paginacao.index * this.paginacao.pageSize,
                            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                        );
                    } else {
                        this.universidade = [];
                        this.paginacao.lista = [];
                    }
                });
        } else {
            this.list.getUniversidade('curso', id, this.sort)
                .subscribe((data: Data) => {
                    if (data.jsonRetorno.length > 0) {
                        this.universidade = data.jsonRetorno[0];
                        this.universidade.tipo = this.tipo;
                        this.paginacao.length = this.universidade.filhos.length;
                        this.paginacao.lista = this.universidade.filhos.slice(
                            this.paginacao.index * this.paginacao.pageSize,
                            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                        );
                    } else {
                        this.universidade = [];
                        this.paginacao.lista = [];
                    }
                });
        }
    }


    ir(item) {
        if (this.user.isLogged) {
            if (this.tipo === 'curso') {
                this.router.navigate([`/gouni/detalhes/${item.id_tipo}/${this.universidade.id}`]);
            } else if (this.tipo === 'universidade') {
                this.router.navigate([`/gouni/detalhes/${this.universidade.id}/${item.id_tipo}`]);
            }
        } else {
            this.popup('login', 'Precisa estar cadastrado para usar essa funcionalidade. Efetue o login para continuar');
        }


    }
    OnChange(value) {
        if (value.compare) {
            this.listCompare.push(value);
        } else {
            this.listCompare.splice(this.listCompare.indexOf(value), 1);
        }
    }

    comparar() {
        const ids = this.listCompare.map(list => list.id_tipo);

        const navigationExtras: NavigationExtras = {
            queryParams: {
                unis: ids.toString(),
                curso: this.universidade.id
            }
        };
        this.router.navigate(['/gouni/compare'], navigationExtras);
    }
    page(event) {
        this.paginacao.pageSize = event.pageSize;
        this.paginacao.index = event.pageIndex;
        this.paginacao.lista = this.universidade.filhos.slice(
            this.paginacao.index * this.paginacao.pageSize,
            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
        );
    }
}
