import { ChangeDetectionStrategy, Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import {NgForOf} from '@angular/common';
import { WebSocketService } from '../../websocket.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ShopComponent {

  products:Product[] = [
    { id: 1, name: 'Tomate', icon: '🍅' },
    { id: 2, name: 'Laitue', icon: '🥬' },
    { id: 3, name: 'Viande', icon: '🥩' },
    { id: 4, name: 'Pain', icon: '🫓' },
    { id: 5, name: 'Produit 5', icon: '🍗' },
    { id: 6, name: 'Produit 6', icon: '🍇' },
    { id: 7, name: 'Produit 7', icon: '🥒' },
    { id: 8, name: 'Produit 8', icon: '🍉' },
    { id: 9, name: 'Produit 9', icon: '🥭' },
    { id: 10, name: 'Produit 10', icon: '🍋' },
  ];

  private readonly tapSound: HTMLAudioElement;

  @ViewChildren('productItem') productItems!: QueryList<ElementRef>;

  constructor(private wsService: WebSocketService) {
    this.tapSound = new Audio("assets/sounds/confirm.mp3");
  }

  OnProductClick(product: Product, index: number) {
    // Jouer le son
    this.tapSound.play().then();
    
    // Ajouter la classe pour l'animation
    const element = this.productItems.get(index)?.nativeElement;
    element.classList.add('clicked');
    
    // Retirer la classe après l'animation
    setTimeout(() => {
      element.classList.remove('clicked');
    }, 500);

    console.log("Le produit : " + product.name + " a été cliqué");
    const message = {
      type: 'add_product',
      product: product,
      from: 'angular',
      to: 'table'
    };
    this.wsService.sendMessage(message);
    return product;
  }

}

export interface Product {
  id: number;
  name: string;
  icon: string;
}
