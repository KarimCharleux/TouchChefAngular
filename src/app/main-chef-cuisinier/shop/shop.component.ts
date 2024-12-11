import {ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {WebSocketService} from '../../websocket.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ShopComponent {

  products: Product[] = [
    {id: 1, name: 'Tomate', icon: '🍅', isOnCooldown: false},
    {id: 2, name: 'Laitue', icon: '🥬', isOnCooldown: false},
    {id: 3, name: 'Viande', icon: '🥩', isOnCooldown: false},
    {id: 4, name: 'Pain', icon: '🫓', isOnCooldown: false},
    {id: 5, name: 'Produit 5', icon: '🍗', isOnCooldown: false},
    {id: 6, name: 'Produit 6', icon: '🍇', isOnCooldown: false},
    {id: 7, name: 'Produit 7', icon: '🥒', isOnCooldown: false},
    {id: 8, name: 'Produit 8', icon: '🍉', isOnCooldown: false},
    {id: 9, name: 'Produit 9', icon: '🥭', isOnCooldown: false},
    {id: 10, name: 'Produit 10', icon: '🍋', isOnCooldown: false},
  ];

  private readonly tapSound: HTMLAudioElement;

  @ViewChildren('productItem') productItems!: QueryList<ElementRef>;

  constructor(private wsService: WebSocketService) {
    this.tapSound = new Audio("assets/sounds/confirm.mp3");
  }

  OnProductClick(product: Product, index: number) {
    if (!product.isOnCooldown) {
      // Jouer le son
      this.tapSound.play().then();

      // Ajouter la classe pour l'animation
      const element = this.productItems.get(index)?.nativeElement;
      element.classList.add('clicked');
      element.classList.add('border-animate');

      // Retirer la classe après l'animation
      setTimeout(() => {
        element.classList.remove('clicked');
      }, 500);

      product.isOnCooldown = true;

      // Désactiver le cooldown après 1.5 secondes
      setTimeout(() => {
        product.isOnCooldown = false;
        element.classList.remove('border-animate');
      }, 1500);


      console.log("Le produit : " + product.name + " a été cliqué");
      const message = {
        type: 'add_product',
        product: product,
        from: 'angular',
        to: 'table'
      };
      this.wsService.sendMessage(message);
    }


    return product;
  }

}

export interface Product {
  id: number;
  name: string;
  icon: string;
  isOnCooldown: boolean;
}
