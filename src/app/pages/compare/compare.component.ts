import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AvalService } from 'src/app/services/aval.service';
import { Data } from 'src/app/models/data';
import { Avaliacao } from 'src/app/models/avaliacacao';

@Component({
    selector: 'app-compare',
    templateUrl: './compare.component.html',
    styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

    id: string;
    comparacoes: Array<any>;
    campos: Array<any>;
    avalicoes: Avaliacao = new Avaliacao;
    maxNota = 5;
    composSubHeader = ['mec', 'guia_estudante', 'mensalidade'];
    constructor(private acRouter: ActivatedRoute, private avalService: AvalService, private router: Router) { }

    ngOnInit() {
        this.campos = Object.keys(this.avalicoes);
        this.acRouter.queryParams.subscribe(params => {
            this.id = params.curso;
            if (params.curso) {
                this.compareUniversidades(params.unis);
            } else {
                this.router.navigate(['/gouni/lista']);
            }

        });
    }

    compareUniversidades(values) {
        this.avalService.compareUniversidades('compare/universidade', this.id, values)
            .subscribe((data: Data) => {
                if (data.jsonRetorno.length > 0) {
                    this.comparacoes = data.jsonRetorno;
                    console.log(this.comparacoes);
                }
            });
    }
}
