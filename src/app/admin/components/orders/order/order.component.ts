import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OrdersService } from 'src/app/core/services/orders.service';
import { ProductsService } from 'src/app/core/services/products.service';
import { UsersService } from 'src/app/core/services/users.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderDetail } from 'src/app/core/models/orderDetail.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[];

  form: FormGroup;
  title: string;
  id: number;
  clientes: any[];
  productos: OrderDetail[];
  filteredClientes?: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<OrderComponent>,
    private ordersService: OrdersService,
    private usersService: UsersService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private domSanitizer: DomSanitizer

  ) {
    this.displayedColumns = ['idproduct', 'nombre', 'descripcion', 'precio', 'cantidad'];
    this.buildForm();

  }

  ngOnInit(): void {
    this.getProductos();
    this.usersService.getUserTypes(3).subscribe(resp => {
      this.clientes = resp;
      this.filteredClientes = this.form?.get('cliente')?.valueChanges.pipe(
        startWith(''), map(value => this._filterClientes(value))
      );
    })
  }
  getProductos() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.productos = products;
    });
  }
  getImage(imageUrl: string) {
    console.log(imageUrl);
    return this.domSanitizer.bypassSecurityTrustUrl('http://localhost:3000/aws/image/' + imageUrl);
  }

  private _filterClientes(value: string) {
    const filterValue = value.toString().toLowerCase();
    return this.clientes.filter(cliente => cliente.nombres.concat(' ').concat(cliente.apellidos).toLowerCase().indexOf(filterValue) === 0);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      cliente: ['', [Validators.required]],
    })
  }

  getDES_CLIENTE(idCliente: any) {
    if (idCliente && this.clientes.length > 0) {
      const cliente = this.clientes.find(cliente => cliente.iduser === idCliente)
      return cliente.nombres + ' ' + cliente.apellidos;
    }
    return '';
  }

  getClientes() {
    this.usersService.getUserTypes(3).subscribe(resp => {
      this.clientes = resp;
    })
  }

  savePedido(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      console.log(this.form.value);
      if (this.id === 0) {
        const user = this.form.value;
        // this.ordersService.createUser(user).subscribe(newUser => {
        //   this.dialogRef.close(user);
        // })

      } else {
        const usera = this.form.value;
        // user.iduser = this.id;
        // this.ordersService.updateUser(user).subscribe(updatedUser => {
        //   this.dialogRef.close(user);
        // })
      }

    }
  }

}
