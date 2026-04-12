import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product as ProductService } from '../product/product';
import { Cartuiservice } from '../cart/cartuiservice'
import { Cart } from '../cart/cart';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements AfterViewInit {


  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;

  @ViewChild('zoomImg') zoomImg!: ElementRef<HTMLImageElement>;

  isPlaying = false;
  product: any;
  audio: HTMLAudioElement | null = null;
  private audioReady = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService, private cartUi: Cartuiservice, private cartService: Cart, private router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.product = this.productService.getProductById(id);
      this.relatedProducts = this.productService
        .getProducts()
        .filter((p: any) => p.id !== id)
        .slice(0, 4);

      console.log("Loaded product:", this.product);
    });
    if (typeof window !== 'undefined') {
      this.audio = new Audio('/home/rabindra-jar/Downloads..mp3');
      this.audio.loop = true;
      this.audio.volume = 0.4;
    }
  }

  // ngOnInit() {

  //   const id = this.route.snapshot.paramMap.get('id')!;
  //   this.product = this.productService.getProductById(id);

  //   // Related products — same service call, exclude current
  //   this.relatedProducts = this.productService
  //     .getProducts()
  //     .filter((p: any) => p.id !== this.product?.id)
  //     .slice(0, 4);

  //   if (typeof window !== 'undefined') {
  //     this.audio = new Audio('/home/rabindra-jar/Downloads..mp3');
  //     this.audio.loop = true;
  //     this.audio.volume = 0.4;
  //   }
  // }

  viewProduct(id: string) {
    console.log("CLICKED VIEW PRODUCT _____________:)", id);
    this.router.navigate(['/products', id]);
  }

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id')!;
  //   this.product = this.productService.getProductById(id);
  //   if (typeof window !== 'undefined') {
  //     this.audio = new Audio('/home/rabindra-jar/Downloads..mp3');
  //     this.audio.loop = true;
  //     this.audio.volume = 0.4;
  //   }
  // }

  // addToCart() {
  //   this.cartService.addItem(this.product);
  //   this.cartUi.trigger({
  //     element: this.zoomImg.nativeElement,
  //     image: this.product.image
  //   });

  //   if (this.isPlaying && this.audio) {
  //     this.audio.pause();
  //     this.isPlaying = false;
  //   }
  // }

  addToCart() {
    if (this.stockStatus === 'out') return;
    for (let i = 0; i < this.quantity; i++) {
      this.cartService.addItem(this.product);
    }
    this.cartUi.trigger({
      element: this.zoomImg.nativeElement,
      image: this.product.image
    });
    this.showToast();
    if (this.isPlaying && this.audio) {
      this.audio.pause();
      this.isPlaying = false;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.audio = this.bgMusic?.nativeElement;
      if (!this.audio) return;
      this.audio.volume = 0.4;
      this.audio.play().catch(() => { });
      this.audioReady = true;
      this.isPlaying = true;
    });
  }

  isZoomed = false;
  zoomScale = 2;
  isDragging = false;
  startX = 0;
  startY = 0;
  translateX = 0;
  translateY = 0;
  prevTranslateX = 0;
  prevTranslateY = 0;

  toggleZoom() {
    this.isZoomed = !this.isZoomed;
    if (!this.isZoomed) {
      this.translateX = 0;
      this.translateY = 0;
      this.prevTranslateX = 0;
      this.prevTranslateY = 0;
    }
  }

  startDrag(event: MouseEvent) {
    if (!this.isZoomed) return;
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
  }

  endDrag() {
    this.isDragging = false;
    this.prevTranslateX = this.translateX;
    this.prevTranslateY = this.translateY;
  }

  dragImage(event: MouseEvent) {
    if (!this.isDragging) return;
    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    this.translateX = this.prevTranslateX + dx;
    this.translateY = this.prevTranslateY + dy;
    const img = this.zoomImg.nativeElement;
    const maxX = (img.offsetWidth * (this.zoomScale - 1)) / 2;
    const maxY = (img.offsetHeight * (this.zoomScale - 1)) / 2;
    this.translateX = Math.max(-maxX, Math.min(this.translateX, maxX));
    this.translateY = Math.max(-maxY, Math.min(this.translateY, maxY));
  }

  onMouseLeave() {
    this.isZoomed = false;
    this.translateX = 0;
    this.translateY = 0;
    this.prevTranslateX = 0;
    this.prevTranslateY = 0;
  }

  playAudio() {
    if (!this.audio) return;

    this.audio.play()
      .then(() => this.isPlaying = true)
      .catch(err => console.log('Play blocked:', err));
  }

  pauseAudio() {
    if (!this.audio) return;
    this.audio.pause();
    this.isPlaying = false;
  }

  toggleAudio() {
    if (!this.audio) {
      console.warn('Audio not initialized yet');
      return;
    }
    this.isPlaying ? this.pauseAudio() : this.playAudio();
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
  }

  quantity = 1;
  wishlisted = false;
  toastVisible = false;
  relatedProducts: any[] = [];

  // Stock — wire to real data when available, mock for now
  get stockStatus(): 'in' | 'low' | 'out' {
    const stock = this.product?.stock ?? 10;
    if (stock === 0) return 'out';
    if (stock <= 3) return 'low';
    return 'in';
  }

  get stockLabel(): string {
    const stock = this.product?.stock ?? 10;
    if (stock === 0) return 'Out of Stock';
    if (stock <= 3) return `Only ${stock} left`;
    return 'In Stock';
  }

  get stockClass(): string {
    return `stock-${this.stockStatus}`;
  }

  // Quantity
  incQty() { this.quantity++; }
  decQty() { if (this.quantity > 1) this.quantity--; }

  // Wishlist
  toggleWishlist() { this.wishlisted = !this.wishlisted; }

  // Toast
  private toastTimer: any;
  showToast() {
    this.toastVisible = true;
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastVisible = false, 2500);
  }

  navigateTo(id: number) {
    this.router.navigate(['/products', id]);
  }

  addRelatedToCart(p: any) {
    this.cartService.addItem({ id: Number(p.id), title: p.title, price: p.price, image: p.image });
  }
}
