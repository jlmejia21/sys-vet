import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../../../core/services/users.service';
import { AppointmentsService } from '../../../../core/services/appointments.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Appointment } from '../../../../core/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {


  medicos: any[];
  form: FormGroup;
  title: string;
  id: number;
  constructor(
    private dialogRef: MatDialogRef<AppointmentComponent>,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private appointmentsService: AppointmentsService,

  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.getMedicos();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      propietario: ['', [Validators.required]],
      mascota: ['', [Validators.required]],
      tipo_mascota: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      id_medico: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
    })
  }

  getMedicos() {
    this.usersService.getUserTypes(2).subscribe(usuarios => this.medicos = usuarios)
  }

  saveCita(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      if (this.id === 0) {
        const appointment = this.form.value;
        this.appointmentsService.createAppointment(appointment).subscribe(newAppointment => {
          this.dialogRef.close(newAppointment);
        })
      } else {
        const appointment: Appointment = this.form.value;
        appointment.idappointment = this.id;
        this.appointmentsService.updateAppointment(appointment).subscribe(updatedAppointment => {
          this.dialogRef.close(updatedAppointment);
        })
      }
    }
  }
}
