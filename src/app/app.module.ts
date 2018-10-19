import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { CompareComponent } from './pages/compare/compare.component';
import { FormatLabelPipe } from './pipes/format-label.pipe';
import { MaskMoneyDirective } from './directives/mask-money.directive';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localePt);

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
    AvaliacaoComponent,
    CompareComponent,
    FormatLabelPipe,
    MaskMoneyDirective,
    DetalhesComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgbModule.forRoot(),

  ],
  entryComponents: [
    NavbarComponent,
    LoginComponent,
    MessageComponent,
    AvaliacaoComponent,
    CadastroComponent
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
