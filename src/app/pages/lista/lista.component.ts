import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ListaService } from '../../services/lista.service';
import { Data } from '../../models/data';

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
  constructor(private acRouter: ActivatedRoute, private list: ListaService, public router: Router) { }

  ngOnInit() {
    this.acRouter.params.subscribe( params => {
      this.pesquisa = params.curso;
      this.acRouter.queryParams.subscribe( parms => {
        this.busca = parms.tipo;
        if (parms.tipo === 'curso') {
          this.getCurso(this.pesquisa);
        } else {
          this.getUniversidade(this.pesquisa);
        }
      });
    });
  }

  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        tipo : this.busca
      }
    };
    const rota = this.curso ? this.curso : '';
    this.router.navigate(['/gouni/lista/', rota], navigationExtras);

  }

  detalhes(id) {

    this.router.navigate([`/gouni/${this.busca}/${id}`]);
  }

  getUniversidade(univ) {
    this.list.getLista('listaUniversidades', univ)
    .subscribe((data: Data) => {
      if (data.jsonRetorno.length > 0 ) {
        this.lista = data.jsonRetorno;

      } else {
        this.lista = [];
      }
    });
  }
  getCurso(curso) {
    this.list.getLista('listaCursos', curso)
    .subscribe((data: Data) => {
      if (data.jsonRetorno.length > 0 ) {
        this.lista = data.jsonRetorno;

      } else {
        this.lista = [];
      }
    });
  }
}
