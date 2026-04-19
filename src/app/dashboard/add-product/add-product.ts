import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product as ProductService } from '../product';



@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProduct {

  product = {
    title: '',
    description: '',
    price: null,
    image: '',
    rating: null
  };

  constructor(private router: Router, private productService : ProductService) {}

  submit() {
    console.log('clicked');
    this.productService.addProduct(this.product).subscribe({
      next: (res) => {
        console.log('Saved successfully', res);
          this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error saving product', err);
      }
    });
  }

}
