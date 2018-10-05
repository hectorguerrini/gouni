import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';


import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { ListaComponent } from './pages/lista/lista.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UniversidadeComponent } from './pages/universidade/universidade.component';

const routes: Routes = [
  {
    path: 'gouni', component: NavbarComponent,
    children: [

      { path: '', component: PrincipalComponent },
      { path: 'signup', component: CadastroComponent },
      { path: 'login', component: LoginComponent },
      { path: 'lista', component: ListaComponent },
      { path: 'lista/:curso', component: ListaComponent },
      { path: ':tipo', component: UniversidadeComponent },
      { path: ':tipo/:id', component: UniversidadeComponent },
    ]
  },
  {path: '' , redirectTo: '/gouni', pathMatch: 'full'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]

})
export class AppRoutingModule { }
