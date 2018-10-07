import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ListaComponent } from './pages/lista/lista.component';
import { UniversidadeComponent } from './pages/universidade/universidade.component';
import { MessageComponent } from './dialogs/message/message.component';
import { AvaliacaoComponent } from './dialogs/avaliacao/avaliacao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PrincipalComponent,
    CadastroComponent,
    LoginComponent,
    ListaComponent,
    UniversidadeComponent,
    MessageComponent,
    AvaliacaoComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgbModule.forRoot(),

  ],
  entryComponents: [
    NavbarComponent,
    LoginComponent,
    MessageComponent,
    AvaliacaoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
