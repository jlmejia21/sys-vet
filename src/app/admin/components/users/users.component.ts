import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { UsersService } from '../../../core/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from './user/user.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[];
  users: User[];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    readonly snackBar: MatSnackBar) {
    this.displayedColumns = ['iduser', 'username', 'nombres', 'apellidos', 'tipo_usuario', 'actions'];
  }

  ngOnInit(): void {
    this.getUsuarios();

  }
  getUsuarios() {
    this.usersService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  addUsuario() {
    const dialogRef = this.dialog.open(UserComponent, {
      // width: "650px",
      // height: "380px",
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Nuevo Usuario';
    dialogRef.componentInstance.id = 0;
    dialogRef.afterClosed()
      .subscribe((user) => {
        if (user) {
          this.open('Se registro el usuario correctamente.', '', { duration: 3000 });
          this.getUsuarios();
        }
      });
  }

  editUsuario(iduser: number) {
    const dialogRef = this.dialog.open(UserComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Editar Usuario';
    dialogRef.componentInstance.id = iduser;
    dialogRef.afterClosed()
      .subscribe((user) => {
        if (user) {
          this.open('Se actualizo el usuario correctamente.', '', { duration: 3000 });
          this.getUsuarios();
        }
      });
  }

  deleteUsuario(iduser: number) {
    this.usersService.deleteUser(iduser).subscribe(resp => {
      this.open('Se elimino el usuario correctamente.', '', { duration: 3000 });
      this.getUsuarios();
    })
  }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }
}


