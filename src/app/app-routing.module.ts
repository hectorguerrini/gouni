import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PrincipalComponent } from './pages/principal/principal.component';

import { ListaComponent } from './pages/lista/lista.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UniversidadeComponent } from './pages/universidade/universidade.component';
import { CompareComponent } from './pages/compare/compare.component';

const routes: Routes = [

  {
    path: 'gouni', component: NavbarComponent,
    children: [

      { path: '', component: PrincipalComponent },
      { path: 'lista', component: ListaComponent },
      { path: 'lista/:tipo', component: ListaComponent },
      { path: 'compare', component: CompareComponent },
      { path: ':tipo', component: UniversidadeComponent },
      { path: ':tipo/:id', component: UniversidadeComponent },

    ]
  }, {path: '**' , redirectTo: '/gouni', pathMatch: 'full'}



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
