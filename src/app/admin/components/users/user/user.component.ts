import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  tipo_cliente: any[];

  form: FormGroup;
  title: string;
  id: number;
  constructor(
    private dialogRef: MatDialogRef<UserComponent>,
    private usersService: UsersService,
    private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.tipo_cliente = [
      { id: 1, value: 'Administrador' },
      { id: 2, value: 'Medico' },
      { id: 3, value: 'Cliente' }
    ]
    if (this.id > 0) {
      this.usersService.getUser(this.id).subscribe(user => {
        this.form.patchValue(user);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      tipo_usuario: [0, [Validators.required]],
    })
  }

  saveUsuario(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      if (this.id === 0) {
        const user = this.form.value;
        this.usersService.createUser(user).subscribe(newUser => {
          this.dialogRef.close(user);
        })

      } else {
        const user: User = this.form.value;
        user.iduser = this.id;
        this.usersService.updateUser(user).subscribe(updatedUser => {
          console.log(updatedUser);
          this.dialogRef.close(user);
        })
      }

    }
  }

}
