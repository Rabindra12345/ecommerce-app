import { Component, ElementRef, ViewChild, effect, inject } from '@angular/core';
import { CartItem, Cart as CartService } from '../cart/cart';
import { Cartuiservice } from '../cart/cartuiservice';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  cartOpen = false;
  bumping = false;
  flyingSrc = '';

  @ViewChild('flyImage') flyImage!: ElementRef<HTMLImageElement>;
  @ViewChild('cartBtn') cartBtn!: ElementRef;

  constructor(
    public cartService: CartService,
    private cartUi: Cartuiservice
  ) {}

  toggleCart() { this.cartOpen = !this.cartOpen; }
  closeCart() { this.cartOpen = false; }

  ngAfterViewInit() {
    this.cartUi.flyAnimation$.subscribe(data => {
      this.triggerFlyAnimation(data.element, data.image);
    });
  }

  triggerFlyAnimation(imgEl: HTMLImageElement, src: string) {
    const rect = imgEl.getBoundingClientRect();
    const cartRect = this.cartBtn.nativeElement.getBoundingClientRect();
    const fly = this.flyImage.nativeElement;

    this.flyingSrc = src;

    fly.classList.remove('fly');
    void fly.offsetWidth;

    fly.style.left = rect.left + 'px';
    fly.style.top = rect.top + 'px';
    fly.style.width = rect.width + 'px';
    fly.style.height = rect.height + 'px';

    fly.style.setProperty('--tx', (cartRect.left - rect.left) + 'px');
    fly.style.setProperty('--ty', (cartRect.top - rect.top) + 'px');

    fly.classList.add('fly');

    // Cart bump after flying
    setTimeout(() => {
      this.bumping = true;
      setTimeout(() => this.bumping = false, 400);
    }, 800);
  }

  // @ViewChild('flyImage') flyImage!: ElementRef<HTMLImageElement>;
  // @ViewChild('cartBtn') cartBtn!: ElementRef;

  // connectedDropLists: string[] = [];

  // constructor(
  //   public cartService: CartService,
  //   private cartUi: Cartuiservice
  // ) {}

  // cartOpen = false;
  // bumping = false;

  // // Keep persistent sections array
  // cartSections: { label: string; items: CartItem[] }[] = [];


  // ngOnInit() {
  //   this.buildSections();
  // }

  // buildSections() {
  //   const items = this.cartService.items();
  //   const today: CartItem[] = [];
  //   const recent: CartItem[] = [];
  //   const now = new Date();

  //   items.forEach(item => {
  //     const diffDays = (now.getTime() - (item.addedAt ?? 0)) / (1000 * 60 * 60 * 24);
  //     if (diffDays < 1) today.push(item);
  //     else if (diffDays <= 7) recent.push(item);
  //   });

  //   this.cartSections = [];
  //   if (today.length) this.cartSections.push({ label: 'Added today', items: today });
  //   if (recent.length) this.cartSections.push({ label: 'Added recently', items: recent });
  // }

  // // dropItem(event: CdkDragDrop<CartItem[]>) {
  // //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  // //   // Update original cart items order
  // //   this.cartService.setItems(this.cartSections.flatMap(s => s.items));
  // // }


  // dropItem(event: CdkDragDrop<CartItem[]>) {
  //   if (event.previousContainer === event.container) {
  //     // Same container → reorder
  //     const newItems = [...event.container.data]; // copy
  //     moveItemInArray(newItems, event.previousIndex, event.currentIndex);
      
  //     // Update the section's items
  //     event.container.data.length = 0; // clear
  //     newItems.forEach(item => event.container.data.push(item));
      
  //     // Update the main cart signal
  //     this.cartService.items.set([...this.cartService.items()]);
  //   } else {
  //     // Different sections → transfer
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //     // Update main cart signal
  //     this.cartService.items.set([...this.cartService.items()]);
  //   }
  // }

  // trackById = (_: number, item: CartItem) => item.id;

  // flyingSrc = '';

  

  // ngAfterViewInit() {
  //   this.cartUi.flyAnimation$.subscribe(data => {
  //     this.triggerFlyAnimation(data.element, data.image);
  //   });

  //   // Initialize connected drop lists
  //   this.connectedDropLists = this.getCartSections().map((_, i) => 'drop-list-' + i);
  // }

  // toggleCart() { this.cartOpen = !this.cartOpen; }
  // closeCart() { this.cartOpen = false; }


  
  

  // bumpCart() {
  //   this.bumping = true;
  //   setTimeout(() => this.bumping = false, 400);
  // }



  

  // isFlying = false;




  
  // buildCartSections(items: CartItem[]): { label: string; items: CartItem[] }[] {
  //   const today: CartItem[] = [];
  //   const recent: CartItem[] = [];
  //   const now = new Date();
  
  //   items.forEach(item => {
  //     const diffDays = (now.getTime() - (item.addedAt ?? 0)) / (1000 * 60 * 60 * 24);
  //     if (diffDays < 1) today.push(item);
  //     else if (diffDays <= 7) recent.push(item);
  //   });
  
  //   const sections = [];
  //   if (today.length) sections.push({ label: 'Added today', items: today });
  //   if (recent.length) sections.push({ label: 'Added recently', items: recent });
  //   return sections;
  // }


  

  // triggerFlyAnimation(imgEl: HTMLImageElement, src: string) {
  //   const rect = imgEl.getBoundingClientRect();
  //   const cartRect = this.cartBtn.nativeElement.getBoundingClientRect();
  //   const fly = this.flyImage.nativeElement;

  //   this.flyingSrc = src;

  //   fly.classList.remove('fly');
  //   void fly.offsetWidth;

  //   fly.style.left = rect.left + 'px';
  //   fly.style.top = rect.top + 'px';
  //   fly.style.width = rect.width + 'px';
  //   fly.style.height = rect.height + 'px';

  //   fly.style.setProperty('--tx', (cartRect.left - rect.left) + 'px');
  //   fly.style.setProperty('--ty', (cartRect.top - rect.top) + 'px');

  //   fly.classList.add('fly');

  //   // Cart bump after flying
  //   setTimeout(() => {
  //     this.bumping = true;
  //     setTimeout(() => this.bumping = false, 400);
  //   }, 800);
  // }

  // // formatTime(timestamp: number) {
  // //   const now = new Date();
  // //   const added = new Date(timestamp);
  // //   const diff = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24); // in days
  // //   return diff < 1 ? 'Added today' :
  // //          diff <= 7 ? 'Added recently' : '';
  // // }

  // formatTime(timestamp?: number): string {
  //   if (!timestamp) return '';
  //   const now = new Date();
  //   const added = new Date(timestamp);
  //   const diffDays = (now.getTime() - added.getTime()) / (1000*60*60*24);
  
  //   if (diffDays < 1) return 'Today';
  //   if (diffDays <= 7) return 'Recently';
  //   return '';
  // }

  // getCartSections(): { label: string; items: CartItem[] }[] {
  //   const items: CartItem[] = this.cartService.items();
  //   const today: CartItem[] = [];
  //   const recent: CartItem[] = [];
  
  //   const now = new Date();
  //   items.forEach(item => {
  //     // fallback to 0 if addedAt is missing
  //     const addedAt = item.addedAt ?? 0; 
  //     const added = new Date(addedAt);
  //     const diffDays = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24);
  
  //     if (diffDays < 1) today.push(item);
  //     else if (diffDays <= 7) recent.push(item);
  //   });
  
  //   const sections = [];
  //   if (today.length) sections.push({ label: 'Added today', items: today });
  //   if (recent.length) sections.push({ label: 'Added recently', items: recent });
  //   return sections;
  // }

  // getCartSections(): { label: string; items: CartItem[] }[] {
  //   const items: CartItem[] = this.cartService.items(); // make sure items are typed
  //   const today: CartItem[] = [];
  //   const recent: CartItem[] = [];
  
  //   const now = new Date();
  //   items.forEach(item => {
  //     const added = new Date(item.addedAt);
  //     const diffDays = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24);
  //     if (diffDays < 1) today.push(item);
  //     else if (diffDays <= 7) recent.push(item);
  //   });
  
  //   const sections = [];
  //   if (today.length) sections.push({ label: 'Added today', items: today });
  //   if (recent.length) sections.push({ label: 'Added recently', items: recent });
  //   return sections;
  // }

  // getCartSections() {
  //   const items = this.cartService.items();
  //   const today: any[] = [];
  //   const recent: any[] = [];
  
  //   const now = new Date();
  //   items.forEach(item => {
  //     const added = new Date(item.addedAt);
  //     const diffDays = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24);
  //     if(diffDays < 1) today.push(item);
  //     else if(diffDays <= 7) recent.push(item);
  //   });
  
  //   const sections = [];
  //   if(today.length) sections.push({ label: 'Added today', items: today });
  //   if(recent.length) sections.push({ label: 'Added recently', items: recent });
  //   return sections;
  // }
}
