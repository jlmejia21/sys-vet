import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ProductComponent>,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private domSanitizer: DomSanitizer
  ) {
    this.buildForm();
  }

  title: string;
  id: number;
  form: FormGroup;

  imageSrc: any;
  fileProduct: any;

  ngOnInit(): void {
    if (this.id > 0) {
      this.productsService.getProduct(this.id).subscribe((product: any) => {
        console.log(product);
        this.form.patchValue(product);
        this.imageSrc = this.domSanitizer.bypassSecurityTrustUrl(this.productsService.awsImage + product.imgUrl)
      });
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)]],
      imgUrl: ['', [Validators.required]],
    })
  }

  getFiles(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.fileProduct = file;
        // this.form.patchValue({
        //   fileSource: reader.result
        // });

      };

    } else {
      this.imageSrc = '';
    }
  }

  saveProducto(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      if (this.id === 0) {
        const product = this.form.value;
        const formData: FormData = new FormData();
        if (this.fileProduct != null /* or whatever clause you want to test that the file exists or not */) {
          formData.set('image', this.fileProduct);
        }
        this.productsService.uploadProduct(formData).subscribe((resp: any) => {
          product.imgUrl = resp.id;
          this.productsService.createProduct(product).subscribe(newProduct => {
            this.dialogRef.close(newProduct);
          })
        });

      } else {
        const product: any = this.form.value;
        product.idproduct = this.id;
        this.productsService.updateProduct(product).subscribe(updatedProduct => {
          this.dialogRef.close(updatedProduct);
        })
      }
    }
  }

}
