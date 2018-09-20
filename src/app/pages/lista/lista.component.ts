import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaService } from '../../services/lista.service';
import { Data } from '../../models/data';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  curso: string;
  lista: Array<any>;
  constructor(private router: ActivatedRoute, private list: ListaService) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.curso = params.curso;
      this.getUniversidade();

    });
  }
  getUniversidade() {
    this.list.getUniversidade('listaUniversidades', this.curso)
    .subscribe((data: Data) => {
      if (data.jsonRetorno.length > 0 ) {
        this.lista = data.jsonRetorno;
        console.log(this.lista);
      } else {
        this.lista = [];
      }
    });
  }

}
