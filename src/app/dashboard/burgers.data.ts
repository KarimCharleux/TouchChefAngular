import { Burger } from './burger.model';

export const BURGERS: Burger[] = [
  {
    id: 1,
    name: 'Classic Burger',
    imageUrl: 'assets/burger/burger1.png',
    ingredients: [
      { name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png' },
      { name: 'Steak haché', imageUrl: 'assets/burger/steak.png' },
      { name: 'Salade', imageUrl: 'assets/burger/salad.png' },
      { name: 'Tomate', imageUrl: 'assets/burger/tomato.png' },
      { name: 'Fromage', imageUrl: 'assets/burger/cheese.png' },
      { name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png' }
    ],
    steps: [
      {
        name: 'Faire cuire le steak',
        subTasks: [
          { order: 1, description: 'Prendre un steak' },
          { order: 2, description: 'Prendre la poele' },
          { order: 3, description: 'Allumer la plaque de cuisson' },
          { order: 4, description: 'Mettre le steak dans la poele puis mettre la poele sur la plaque' },
          { order: 5, description: 'Cuire 30 secondes' },
          { order: 6, description: 'Retirer le steak de la poele' }
        ]
      },
      {
        name: 'Prendre le haut et bas du pain burger',
        subTasks: []
      },
      {
        name: 'Couper les tomates',
        subTasks: [
          { order: 1, description: 'Prendre la tomate' },
          { order: 2, description: 'Laver la tomate' },
          { order: 3, description: 'Couper la tomate en deux avec la paume de la main' },
          { order: 4, description: 'Répéter l\'opération jusqu\'a qu\'elle se soit toutes coupées' }
        ]
      },
      {
        name: 'Couper la salade',
        subTasks: [
          { order: 1, description: 'Prendre la salade' },
          { order: 2, description: 'Laver la salade' },
          { order: 3, description: 'Couper la salade en deux avec la paume de la main' },
          { order: 4, description: 'Répéter l\'opération jusqu\'a qu\'elle se soit toutes coupées' }
        ]
      },
      {
        name: 'Couper le fromage',
        subTasks: [
          { order: 1, description: 'Prendre le fromage' },
          { order: 2, description: 'Couper le fromage en deux avec la paume de la main' },
          { order: 3, description: 'Répéter l\'opération jusqu\'a qu\'elle se soit toutes coupées' }
        ]
      },
      {
        name: 'Assembler dans l\'ordre : pain, salade, tomate, steak, fromage, pain',
        subTasks: [
          { order: 1, description: 'Prendre le bas du pain' },
          { order: 2, description: 'Mettre la salade sur le pain' },
          { order: 3, description: 'Mettre la tomate sur la salade' },
          { order: 4, description: 'Mettre le steak sur la tomate' },
          { order: 5, description: 'Mettre le fromage sur le steak' },
          { order: 6, description: 'Mettre le haut du pain sur le fromage' }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Double Cheese',
    imageUrl: 'assets/burger/burger2.png',
    ingredients: [
      { name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png' },
      { name: 'Steak haché', imageUrl: 'assets/burger/steak.png' },
      { name: 'Fromage', imageUrl: 'assets/burger/cheese.png' },
      { name: 'Oignon', imageUrl: 'assets/burger/onions.png' },
      { name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png' }
    ],
    steps: [
      {
        name: 'Faire cuire les steaks',
        subTasks: [
          { order: 1, description: 'Prendre deux steaks dans le frigo' },
          { order: 2, description: 'Allumer la plaque de cuisson' },
          { order: 3, description: 'Mettre les steaks sur la plaque' },
          { order: 4, description: 'Cuire 3 minutes de chaque côté' },
          { order: 5, description: 'Retirer les steaks de la plaque' }
        ]
      },
      {
        name: 'Toaster le pain',
        subTasks: [
          { order: 1, description: 'Couper le pain en deux' },
          { order: 2, description: 'Toaster légèrement les faces intérieures' }
        ]
      },
      {
        name: 'Ajouter la sauce spéciale',
        subTasks: []
      },
      {
        name: 'Assembler dans l\'ordre : pain, steak, fromage, steak, fromage, oignons, pain',
        subTasks: []
      }
    ]
  }
]; 