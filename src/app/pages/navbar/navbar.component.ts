import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../auth.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged: Observable<boolean>;
  user:  Observable<string>;
  animal: string;
  name: string;

  constructor(private auth: AuthService, private router: Router, public dialog: MatDialog) {
    console.log('Constructor NavBar');
  }

  ngOnInit() {
    console.log('ngOnInit NavBar');
    this.logged = this.auth.isLoggedIn;
    console.log(this.logged);

    this.user = this.auth.userLogged;

  }

  login() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '630px';

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('this is result: ' + result);

    });

  }
  signOut() {
    this.auth.setLogged(false, null);
    this.router.navigate(['/']);

  }

}
