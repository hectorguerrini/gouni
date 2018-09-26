import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  curso: string;
  busca = 'curso';
  constructor(private router: Router) {
    console.log('Constructor Principal');
  }

  ngOnInit() {
    console.log('ngOnInit Principal');
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

}
