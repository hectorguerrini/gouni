import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  curso: string;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe( params => {
      this.curso = params.curso;
    });
  }

}
