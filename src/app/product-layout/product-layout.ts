import { Component, NgModule, OnInit } from '@angular/core';
import { Product as ProductService } from '../product/product';
import { Router } from '@angular/router';

import { Cart as CartService} from '../cart/cart';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../login/authservice';



interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  image: string;
}

@Component({
  selector: 'app-product-layout',
  standalone: false,
  templateUrl: './product-layout.html',
  styleUrl: './product-layout.scss',
})
export class ProductLayout implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService,    public auth:Authservice      
  ) { }

  products: Product[] = Array.from({ length: 20 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Product ${i + 1}`,
    description: `Description for product ${i + 1}`,
    price: Math.floor(Math.random() * 500) + 50,
    category: i % 2 === 0 ? 'Electronics' : 'Clothing',
    rating: parseFloat((Math.random() * 5).toFixed(1)),
    image: `https://picsum.photos/seed/${i + 1}/200/200`
  }));

  filteredProducts: Product[] = [...this.products];
  searchText = '';
  selectedCategory = 'All';
  sortOption = '';
  categories = ['All', 'Electronics', 'Clothing', 'Books'];

  ngOnInit() {
    this.productService.setProducts(this.products);
  }
  
  minPrice = 50;
  maxPrice = 550;
  absoluteMin = 50;
  absoluteMax = 550;
  minRating = 0;
  currentPage = 1;
  pageSize = 10;
  
  get totalFiltered() { return this.filteredProducts.length; }
  get totalPages() { return Math.ceil(this.totalFiltered / this.pageSize); }
  get pageStart() { return (this.currentPage - 1) * this.pageSize + 1; }
  get pageEnd() { return Math.min(this.currentPage * this.pageSize, this.totalFiltered); }
  get pageNumbers() { return Array.from({ length: this.totalPages }, (_, i) => i + 1); }
  get pagedProducts() {
    return this.filteredProducts.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }
  
  setMinRating(val: number) {
    this.minRating = val;
    this.applyFilters();
  }
  
  goToPage(page: number) {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
 addToCart(product: Product) {
  if (!this.auth.isLoggedIn()) {
    alert('Please login to add items to cart');

    this.router.navigate(['/login']);
    return;
  }

  this.cartService.addItem({
    ...product,
    id: Number(product.id)
  });
  // this.cartService.addItem({ ...product, id: Number(product.id) });
}
  resetFilters() {
    this.searchText = '';
    this.selectedCategory = 'All';
    this.sortOption = '';
    this.minPrice = this.absoluteMin;
    this.maxPrice = this.absoluteMax;
    this.minRating = 0;
    this.applyFilters();
  }
  
  applyFilters() {
    let data = [...this.products];
  
    if (this.searchText) {
      data = data.filter(p =>
        p.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    if (this.selectedCategory !== 'All') {
      data = data.filter(p => p.category === this.selectedCategory);
    }
    data = data.filter(p => p.price >= this.minPrice && p.price <= this.maxPrice);
      if (this.minRating > 0) {
    data = data.filter(p => p.rating >= this.minRating);
    }
  
    if (this.sortOption === 'priceLow') {
      data.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'priceHigh') {
      data.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'topRated') {   // ADD
      data.sort((a, b) => b.rating - a.rating);
    } else if (this.sortOption === 'newest') {      // ADD
      data.sort((a, b) => Number(b.id) - Number(a.id));
    }
  
    this.filteredProducts = data;
    this.currentPage = 1; 
  }

  onSortChange(value: string) {
    this.sortOption = value;
    this.applyFilters();
  }

  onSearch(value: string) {
    this.searchText = value;
    this.applyFilters();
  }

  viewProduct(id: string) {
    this.router.navigate(['/products', id]);
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.applyFilters();
  }

  



  // constructor(private productService: ProductService, private router: Router
  // ) { }

  // ngOnInit() {
  //   this.productService.setProducts(this.products);
  // }

  // products: Product[] = Array.from({ length: 20 }, (_, i) => ({
  //   id: (i + 1).toString(),
  //   title: `Product ${i + 1}`,
  //   description: `Description for product ${i + 1}`,
  //   price: Math.floor(Math.random() * 500) + 50,
  //   category: i % 2 === 0 ? 'Electronics' : 'Clothing',
  //   rating: parseFloat((Math.random() * 5).toFixed(1)),
  //   image: `https://picsum.photos/seed/${i + 1}/200/200`
  // }));

  // filteredProducts: Product[] = [...this.products];
  // searchText = '';
  // selectedCategory = 'All';
  // sortOption = '';
  // categories = ['All', 'Electronics', 'Clothing', 'Books'];

  

  // onCategoryChange(category: string) {
  //   this.selectedCategory = category;
  //   this.applyFilters();
  // }

  

  // applyFilters() {
  //   let data = [...this.products];

  //   if (this.searchText) {
  //     data = data.filter(p =>
  //       p.title.toLowerCase().includes(this.searchText.toLowerCase())
  //     );
  //   }
  //   if (this.selectedCategory !== 'All') {
  //     data = data.filter(p => p.category === this.selectedCategory);
  //   }
  //   if (this.sortOption === 'priceLow') {
  //     data.sort((a, b) => a.price - b.price);
  //   } else if (this.sortOption === 'priceHigh') {
  //     data.sort((a, b) => b.price - a.price);
  //   }
  //   this.filteredProducts = data;
  // }

 

}