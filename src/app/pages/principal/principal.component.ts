import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  curso: string;
  constructor() {
    console.log('Constructor Principal');
  }

  ngOnInit() {
    console.log('ngOnInit Principal');
  }


}
