import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../../core/services/users.service';
import { User } from '../../../../core/models/user.model';
import { MustMatch } from 'src/app/utils/MustMatch';

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
      { id: '1', value: 'Administrador' },
      { id: '2', value: 'Medico' },
      { id: '3', value: 'Cliente' }
    ]
    if (this.id > 0) {
      this.usersService.getUser(this.id).subscribe((user: any) => {
        this.form.patchValue(user);
        this.form.get('confirmPassword')?.setValue(user.password);
      });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: [''],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      tipo_usuario: ['', [Validators.required]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  get f() { return this.form.controls; }

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
          this.dialogRef.close(user);
        })
      }

    }
  }

}
