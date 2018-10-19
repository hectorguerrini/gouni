import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';

import { UserService } from '../../user.service';
import { Data } from '../../models/data';
import { MessageComponent } from 'src/app/dialogs/message/message.component';



@Component({
    selector: 'app-cadatro',
    templateUrl: './cadastro.component.html',
    styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
    cadastro: any;
    constructor(private service: UserService, private router: Router,
        private dialog: MatDialog, public dialogRef: MatDialogRef<CadastroComponent>
        ) { }

    ngOnInit() {
        this.cadastro = {};
    }
    onNoClick(): void {
        this.dialogRef.close();
    }
    updateUsuario() {
        this.service.updateUsuario(
            'updateUsuario',
            this.cadastro.usuario,
            this.cadastro.senha,
            this.cadastro.nome,
            this.cadastro.email,
            this.cadastro.dt_nasc,
            this.cadastro.tipo
        ).subscribe((data: Data) => {
            if (data.jsonRetorno.length > 0) {
                this.router.navigate(['/home']);
                this.popup('success', 'Cadastro efetuado com sucesso!');
                this.dialogRef.close();
            }
        });
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
