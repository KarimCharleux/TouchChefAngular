import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgForOf} from '@angular/common';

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

  products = [
    { id: 1, name: 'Produit 1', icon: '🍎' },
    { id: 2, name: 'Produit 2', icon: '🥕' },
    { id: 3, name: 'Produit 3', icon: '☁️' },
    { id: 4, name: 'Produit 4', icon: '🥔' },
    { id: 5, name: 'Produit 5', icon: '🍗' },
    { id: 6, name: 'Produit 6', icon: '🍇' },
    { id: 7, name: 'Produit 7', icon: '🥒' },
    { id: 8, name: 'Produit 8', icon: '🍉' },
    { id: 9, name: 'Produit 9', icon: '🥭' },
    { id: 10, name: 'Produit 10', icon: '🍋' },
  ];

}
