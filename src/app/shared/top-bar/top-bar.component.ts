import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, NavigationEnd } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {

  constructor(private router: Router, private accountService: AccountService, private dialog: MatDialog) {}

  ngOnInit(): void {
  }


  doLogout(){

    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '300px',
      data: { title: 'Confirmar', message: '¿Seguro/a que desea cerrar la sesión actual?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.accountService.logOut();
      }
    });

  }
}
