import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ShopWebSocketService} from './shop-websocket.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgForOf, NgClass, NgIf],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopComponent {
  @ViewChildren('productItem') productItems!: QueryList<ElementRef>;

  products: Product[] = [
    {id: 1, name: 'Tomate', icon: '🍅', isOnCooldown: false},
    {id: 2, name: 'Laitue', icon: '🥬', isOnCooldown: false},
    {id: 3, name: 'Viande', icon: '🥩', isOnCooldown: false},
    {id: 4, name: 'Pain', icon: '🫓', isOnCooldown: false},
    {id: 5, name: 'Fromage', icon: '🧀', isOnCooldown: false},
    {id: 5, name: 'Fromage', icon: '🧀', isOnCooldown: false},
    {id: 5, name: 'Fromage', icon: '🧀', isOnCooldown: false},
    {id: 5, name: 'Fromage', icon: '🧀', isOnCooldown: false},
    {id: 5, name: 'Fromage', icon: '🧀', isOnCooldown: false},
    {id: 5, name: 'Fromage', icon: '🧀', isOnCooldown: false},
  ];

  private readonly tapSound: HTMLAudioElement;

  constructor(
    private readonly shopWsService: ShopWebSocketService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.tapSound = new Audio('assets/sounds/tap.mp3');
  }

  OnProductClick(product: Product, index: number) {
    if (!product.isOnCooldown) {
      this.tapSound.play().then();
      product.isOnCooldown = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        product.isOnCooldown = false;
        this.cdr.detectChanges();
      }, 1500);

      this.shopWsService.sendShopItemToTable(product);
    }
  }
}

export interface Product {
  id: number;
  name: string;
  icon: string;
  isOnCooldown: boolean;
}
