import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../../core/services/appointments.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppointmentComponent } from './appointment/appointment.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {


  displayedColumns: string[];
  appoinments: any[];
  appointments: any[];

  constructor(
    private appointmentsService: AppointmentsService,
    public dialog: MatDialog,
    readonly snackBar: MatSnackBar) {
    this.displayedColumns = ['iduser', 'username', 'nombres', 'apellidos', 'actions'];
  }

  ngOnInit(): void {
    this.getCitas();
  }

  getCitas() {
    this.appointmentsService.getAll().subscribe(appointments => {
      this.appointments = appointments;
      console.log(this.appointments);
    });
  }

  addCita() {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Nueva Cita';
    dialogRef.componentInstance.id = 0;
    dialogRef.afterClosed()
      .subscribe((appointment) => {
        if (appointment) {
          this.open('Se registro la cita correctamente.', '', { duration: 3000 });
          this.getCitas();
        }
      });
  }
  editCita(iduser: number) {
    const dialogRef = this.dialog.open(AppointmentComponent, {
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Editar Cita';
    dialogRef.componentInstance.id = iduser;
    dialogRef.afterClosed()
      .subscribe((appointment) => {
        if (appointment) {
          this.open('Se actualizo la cita correctamente.', '', { duration: 3000 });
          this.getCitas();
        }
      });
  }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }


}
