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
        name: 'Préparer le steak',
        subTasks: [
          { order: 1, description: 'Prendre le steako' },
          { order: 2, description: 'Déplacer le steak sur la poele du haut' },
          { order: 3, description: 'Attendre la cuisson pendant 3 secondes' },
          { order: 4, description: 'Eteindre la plaque de cuisson' }
        ]
      },
      {
        name: 'Récupérer des tranches de tomate',
        subTasks: [
          { order: 1, description: 'Prendre une tomate' },
          { order: 3, description: 'Couper la tomate en tranches avec la tranche de la main' }
        ]
      },
      {
        name: 'Laver une salade',
        subTasks: [
          { order: 1, description: 'Prendre une salade' },
          { order: 2, description: 'Laver la salade' }
        ]
      },
      {
        name: 'Préparer le fromage',
        subTasks: [
          { order: 1, description: 'Prendre du fromage' },
          { order: 2, description: 'Le déplacer sur la planche à découper en haut à gauche' }
        ]
      },
      {
        name: 'Poser une assiette sur la table',
        subTasks: []
      },
      {
        name: 'Prendre un pain et mettre sur l\'assiette',
        subTasks: []
      },
      {
        name: 'Ajouter la tomate',
        subTasks: [
          { order: 1, description: 'Déplacer la tomate coupée sur le steak qui est sur l\'assiette' }
        ]
      },
      {
        name: 'Préparer la salade',
        subTasks: [
          { order: 1, description: 'Déplacer la salade sur la planche à découper en bas' }
        ]
      },
      {
        name: 'Couper la salade',
        subTasks: [
          { order: 1, description: 'Couper la salade sur la planche' }
        ]
      },
      {
        name: 'Ajouter la salade',
        subTasks: [
          { order: 1, description: 'Déplacer la salade sur le steak' }
        ]
      },
      {
        name: 'Préparer le fromage',
        subTasks: [
          { order: 1, description: 'Couper le fromage sur la planche en haut' }
        ]
      },
      {
        name: 'Ajouter le fromage',
        subTasks: [
          { order: 1, description: 'Déplacer le fromage sur la salade' }
        ]
      },
      {
        name: 'Finaliser le burger',
        subTasks: [
          { order: 1, description: 'Prendre un autre pain et le mettre sur le fromage' }
        ]
      },
      {
        name: 'Mettre au four',
        subTasks: [
          { order: 1, description: 'Ouvrir le four en glissant vers le bas avec le doigt' },
          { order: 2, description: 'Maintenir le doigt sur le four et déplacer le burger fini dans le four' }
        ]
      },
      {
        name: 'Cuisson',
        subTasks: [
          { order: 1, description: 'Lâcher le doigt pour fermer le four' },
          { order: 2, description: 'Attendre 5 minutes' }
        ]
      },
      {
        name: 'Sortir le burger',
        subTasks: [
          { order: 1, description: 'Ouvrir le four en glissant vers le bas avec le doigt' },
          { order: 2, description: 'Maintenir le doigt et déplacer le burger sur l\'assiette' }
        ]
      }
    ]
  }
]; 