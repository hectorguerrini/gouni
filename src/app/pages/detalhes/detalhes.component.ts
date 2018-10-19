import { Component, OnInit } from '@angular/core';
import { ListaService } from 'src/app/services/lista.service';
import { ActivatedRoute } from '@angular/router';
import { Data } from 'src/app/models/data';
import { Paginacao } from 'src/app/models/paginacao';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-detalhes',
    templateUrl: './detalhes.component.html',
    styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

    detalhes: any;
    maxNota = 5;
    paginacao: Paginacao;
    constructor(private list: ListaService, private acRouter: ActivatedRoute) { }

    ngOnInit() {
        this.paginacao = new Paginacao;
        this.acRouter.params.subscribe(params => {
            this.getDetalhes(params.id_uni, params.id_curso);
        });

    }

    getDetalhes(id_uni, id_curso) {
        this.list.getDetalhes('detalhes', id_uni, id_curso)
        .subscribe((data: Data) => {
            if (data.jsonRetorno.length > 0) {
                this.detalhes = data.jsonRetorno[0];
                this.paginacao.length = this.detalhes.comentarios.length;
                this.paginacao.lista = this.detalhes.comentarios.slice(
                    this.paginacao.index * this.paginacao.pageSize,
                    (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                );
            } else {
                this.detalhes = {};
            }

        });

    }
    formatData(data){
        return formatDate(data, 'medium', 'pt');

    }
    page(event) {
        this.paginacao.pageSize = event.pageSize;
        this.paginacao.index = event.pageIndex;
        this.paginacao.lista = this.detalhes.comentarios.slice(
            this.paginacao.index * this.paginacao.pageSize,
            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
        );
    }

}
