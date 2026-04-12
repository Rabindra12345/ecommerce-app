import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDrawer } from './cart-drawer';

describe('CartDrawer', () => {
  let component: CartDrawer;
  let fixture: ComponentFixture<CartDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartDrawer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
