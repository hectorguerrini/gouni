import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig} from '@angular/material';

import { UserService } from '../../user.service';
import { Data } from '../../models/data';
import { AuthService } from '../../auth.service';
import { MessageComponent } from 'src/app/dialogs/message/message.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any;
  error = false;
  constructor(private service: UserService, private dialog: MatDialog, private auth: AuthService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) { }

  ngOnInit() {
    this.login = {};
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  loginUsuario() {
    this.service.loginUsuario('loginUsuario', this.login.email, this.login.senha)
    .subscribe((data: Data) => {
      if (data.jsonRetorno.length > 0) {
        this.auth.setLogged(true, data.jsonRetorno[0].email, data.jsonRetorno[0].id_usuario);
        this.popup('success', 'Login efetuado com sucesso!');

        this.dialogRef.close();

      } else {
        this.error = true;
      }

    });

  }
  irCadastro() {
    this.dialogRef.close('cadastro');
  }
  popup(status, message) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '260px';
    dialogConfig.data = {status: status, message: message};
    const dialogRef = this.dialog.open(MessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });

  }

}
