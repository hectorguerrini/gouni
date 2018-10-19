import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ListaService } from '../../services/lista.service';
import { Data } from '../../models/data';
import { Paginacao } from 'src/app/models/paginacao';


@Component({
    selector: 'app-lista',
    templateUrl: './lista.component.html',
    styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

    pesquisa: string;
    curso: string;
    lista: Array<any>;
    busca: string;
    tipo: string;
    paginacao: Paginacao;
    constructor(private acRouter: ActivatedRoute, private list: ListaService, public router: Router) { }

    ngOnInit() {
        this.paginacao = new Paginacao;
        this.acRouter.queryParams.subscribe(params => {
            this.pesquisa = params.curso ? params.curso : '';
            this.acRouter.params.subscribe(parms => {
                this.busca = parms.tipo;
                this.tipo = parms.tipo;
                if (parms.tipo === 'curso') {
                    this.getCurso(this.pesquisa);
                } else if (parms.tipo === 'universidade') {
                    this.getUniversidade(this.pesquisa);
                } else {
                    this.router.navigate(['/gouni']);
                }
            });
        });

    }

    search() {

        const navigationExtras: NavigationExtras = {
            queryParams: {
                curso: this.curso
            }
        };
        const rota = this.busca ? this.busca : '';
        this.router.navigate(['/gouni/lista/', rota], navigationExtras);

    }

    detalhes(id) {

        this.router.navigate([`/gouni/${this.busca}/${id}`]);
    }

    getUniversidade(univ) {
        this.list.getLista('listaUniversidades', univ)
            .subscribe((data: Data) => {
                if (data.jsonRetorno.length > 0) {
                    this.paginacao.length = data.jsonRetorno.length;
                    this.lista = data.jsonRetorno;
                    this.paginacao.lista = this.lista.slice(
                        this.paginacao.index * this.paginacao.pageSize,
                        (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                    );

                } else {
                    this.lista = [];
                    this.paginacao.lista = [];
                }
            });
    }
    getCurso(curso) {
        this.list.getLista('listaCursos', curso)
            .subscribe((data: Data) => {
                if (data.jsonRetorno.length > 0) {
                    this.paginacao.length = data.jsonRetorno.length;
                    this.lista = data.jsonRetorno;
                    this.paginacao.lista = this.lista.slice(
                        this.paginacao.index * this.paginacao.pageSize,
                        (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
                    );
                } else {
                    this.lista = [];
                    this.paginacao.lista = [];
                }
            });
    }

    page(event) {
        this.paginacao.pageSize = event.pageSize;
        this.paginacao.index = event.pageIndex;
        this.paginacao.lista = this.lista.slice(
            this.paginacao.index * this.paginacao.pageSize,
            (this.paginacao.index * this.paginacao.pageSize) + this.paginacao.pageSize
        );
    }
}
