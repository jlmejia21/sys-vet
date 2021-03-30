import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,

  ) {
    this.buildForm();
  }


  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }


  login(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const value = this.form.value;
      this.authService.loginUser(value.usuario, value.password).subscribe(rpta => {
        console.log(rpta);
        if (rpta) {
          this.router.navigate(['/'])
        } else {
          alert('NO ES VALIDO')
        }
      })
    }
  }

}
