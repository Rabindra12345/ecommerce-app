import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Cart as CartService } from '../cart/cart';
import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-drawer',
  standalone: false,
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.scss',
})
export class CartDrawer {


  @Input() cartOpen = false;
  @Output() closeDrawer = new EventEmitter<void>();

  connectedDropLists: string[] = [];

  constructor(public cartService: CartService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit() {
    this.rebuildConnectedLists();
  }

  rebuildConnectedLists() {
    this.connectedDropLists = this.cartService
      .getSections()
      .map((_: any, i: number) => 'drop-list-' + i);
  }

  close() {
    this.closeDrawer.emit();
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  dropItem(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Force signal update so Angular detects the mutation
    const current = this.cartService.items();
    this.cartService.items.set([...current]);
    this.cdr.detectChanges();
  }

  formatTime(timestamp?: number): string {
    if (!timestamp) return '';
    const now = new Date();
    const added = new Date(timestamp);
    const diffDays = (now.getTime() - added.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays < 1 ? 'Today' : diffDays <= 7 ? 'Recently' : '';
  }

  onDragStart() {
    document.body.classList.add('dragging');
  }

  onDragEnd() {
    document.body.classList.remove('dragging');
  }

  goToCheckout() {
    console.log("CLICKED ON CHECKOUT ...HOLY SHIT.");
    this.router.navigate(['/checkout']);
  }

}
