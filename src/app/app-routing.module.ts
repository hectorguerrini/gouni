import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { LoginComponent } from './pages/login/login.component';
import { ListaComponent } from './pages/lista/lista.component';
const routes: Routes = [
  { path: 'home', component: PrincipalComponent },
  { path: 'signup', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lista/', component: ListaComponent },
  { path: 'lista/:curso', component: ListaComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]

})
export class AppRoutingModule { }
