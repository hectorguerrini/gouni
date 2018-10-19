import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

import { AuthService } from 'src/app/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AvaliacaoComponent } from 'src/app/dialogs/avaliacao/avaliacao.component';
import { MessageComponent } from 'src/app/dialogs/message/message.component';
import { ListaService } from 'src/app/services/lista.service';
import { Data } from 'src/app/models/data';
import { Combo } from 'src/app/models/combo';


@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
    curso: string;
    busca = 'curso';
    combo = new Combo;
    constructor(private router: Router, private user: AuthService, private dialog: MatDialog, private list: ListaService) {

    }

    ngOnInit() {
        this.getCombo('cursos');
        this.getCombo('universidades');
    }
    getCombo(labelCombo: string, id?: number) {
        this.list.getCombo('combo', labelCombo, id ? id.toString() : null)
        .subscribe((data: Data) => {
            if ( data.jsonRetorno.length > 0) {
                this.combo[labelCombo] = data.jsonRetorno;
            } else {
                this.combo[labelCombo] = [];
            }
        });
    }
    search() {
        const navigationExtras: NavigationExtras = {
            queryParams: {
                curso: this.curso
            }
        };
        const rota = this.busca ? this.busca : '';
        this.router.navigate(['/gouni/lista/', rota], navigationExtras);
    }
    setAval() {

        if (this.user.isLogged) {
            const dialogConfig = new MatDialogConfig();

            dialogConfig.disableClose = false;
            dialogConfig.hasBackdrop = true;
            dialogConfig.autoFocus = true;
            // dialogConfig.width = '900px';
            //   dialogConfig.height = '80%';
            dialogConfig.data = this.combo;
            const dialogRef = this.dialog.open(AvaliacaoComponent, dialogConfig);

            dialogRef.afterClosed().subscribe((result) => {

            });
        } else {
            this.popup('login', 'Precisa estar cadastrado para usar essa funcionalidade. Efetue o login para continuar');
        }
    }
    popup(status, message) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.hasBackdrop = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '260px';
        dialogConfig.data = { status: status, message: message };
        const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {

        });

    }
}
