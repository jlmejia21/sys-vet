import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-order',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: any[];
  displayedColumns: string[];

  constructor(
    public dialog: MatDialog,
    readonly snackBar: MatSnackBar
  ) {
    this.displayedColumns = ['idorder', 'cliente', 'total', 'actions'];
  }

  ngOnInit(): void {
  }

  getPedidos() {
  }

  addOrden() {
    const dialogRef = this.dialog.open(OrderComponent, {
      height: '70%',
      width: '60%',
      disableClose: true,
    });
    dialogRef.componentInstance.title = 'Nuevo Pedido';
    dialogRef.componentInstance.id = 0;
    dialogRef.afterClosed()
      .subscribe((user) => {
        if (user) {
          this.open('Se registro el usuario correctamente.', '', { duration: 3000 });
          this.getPedidos();
        }
      });
  }

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }
}
