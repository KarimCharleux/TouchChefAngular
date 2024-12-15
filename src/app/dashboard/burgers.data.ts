import {Burger} from './burger.model';

export const BURGERS: Burger[] = [
  {
    id: 1,
    name: 'Classic Burger',
    imageUrl: 'assets/burger/burger1.png',
    ingredients: [
      {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'},
      {name: 'Steak haché', imageUrl: 'assets/burger/steak.png'},
      {name: 'Salade', imageUrl: 'assets/burger/salad.png'},
      {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'},
      {name: 'Fromage', imageUrl: 'assets/burger/cheese.png'},
      {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'}
    ],
    steps: [
      {
        id: '1_1',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande sur la poele du haut'},
          {order: 3, description: 'Attendre la cuisson pendant 3 secondes'},
          {order: 4, description: 'Eteindre la plaque de cuisson'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1
      },
      {
        id: '1_2',
        name: 'Cuire le steak',
        subTasks: [
          {order: 1, description: 'Prendre la viande déjà préparée'},
          {order: 2, description: 'Déplacer la viande sur la poele du haut'},
          {order: 3, description: 'Attendre la cuisson pendant 3 secondes'},
          {order: 4, description: 'Eteindre la plaque de cuisson'}
        ],
        nbCooksNeeded: 1,
        duration: 31,
        icons: "🔥🥩",
        quantity: 1,
        workStation: 'grill'
      },
      {
        id: '1_3',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier'
      },
      {
        id: '1_4',
        name: 'Cuiper les tranches de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Déplacer la tomate sur la planche à découper'},
          {order: 3, description: 'Couper la tomate en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 2,
        icons: "🔪🍅",
        quantity: 1
      },
      {
        id: '1_5',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1
      },
      {
        id: '1_6',
        name: 'Préparer le fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'}
        ],
        nbCooksNeeded: 1,
        icons: "🧀",
        quantity: 1
      },
      {
        id: '1_7',
        name: 'Poser une assiette sur la table',
        subTasks: [],
        nbCooksNeeded: 1,
        icons: "🍽️",
        quantity: 1
      },
      {
        id: '1_8',
        name: 'Prendre un pain et mettre sur l\'assiette',
        subTasks: [],
        nbCooksNeeded: 1,
        icons: "🍞",
        quantity: 1
      },
      {
        id: '1_9',
        name: 'Déplacer le steak sur le pain',
        subTasks: [],
        nbCooksNeeded: 1,
        icons: "🥩",
        quantity: 1
      },
      {
        id: '1_10',
        name: 'Déplacer la tomate coupée sur le steak qui est sur l\'assiette',
        subTasks: [],
        nbCooksNeeded: 1,
        icons: "🍅",
        quantity: 1
      },
      {
        id: '1_11',
        name: 'Préparer la salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper en bas'},
          {order: 3, description: 'Couper la salade'}
        ],
          nbCooksNeeded: 1,
        icons: "🥬",
        quantity: 1
      },
      {
        id: '1_12',
        name: 'Déplacer la salade coupée sur la tomate',
        subTasks: [],
        nbCooksNeeded: 1,
        icons: "🥬",
        quantity: 1
      },
      {
        id: '1_13',
        name: 'Préparer le fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Déplacer le fromage sur la planche à découper'}
        ],
        nbCooksNeeded: 1,
        icons: "🧀",
        quantity: 1
      },
      {
        id: '1_14',
        name: 'Couper le fromage et le déplacer sur l\'assiette',
        subTasks: [],
        nbCooksNeeded: 1,
        icons: "🧀",
        quantity: 1
      },
      {
        id: '1_15',
        name: 'Finaliser le burger',
        subTasks: [
          {order: 1, description: 'Prendre un autre pain et le mettre sur le haut du burger qui est sur l\'assiette'}
        ],
          nbCooksNeeded: 1,
        icons: "🍞",
        quantity: 1
      },
      {
        id: '1_16',
        name: 'Mettre le burger au four',
        subTasks: [
          {order: 1, description: 'Ouvrir le four en glissant vers le bas avec le doigt'},
          {order: 2, description: 'Maintenir le doigt sur le four et déplacer le burger fini dans le four'}
        ],
        nbCooksNeeded: 1,
        icons: "🔥",
        quantity: 1
      },
      {
        id: '1_17',
        name: 'Légère cuisson du burger',
        subTasks: [
          {order: 1, description: 'Lâcher le doigt pour fermer le four'},
          {order: 2, description: 'Attendre 5 secondes'}
        ],
        nbCooksNeeded: 1,
        icons: "🔥",
        quantity: 1
      },
      {
        id: '1_18',
        name: 'Sortir le burger',
        subTasks: [
          {order: 1, description: 'Ouvrir le four en glissant vers le bas avec le doigt'},
          {order: 2, description: 'Maintenir le doigt et déplacer le burger sur l\'assiette au centre'}
        ],
          nbCooksNeeded: 1,
        icons: "🍽️",
        quantity: 1
      },
    ]
  }
];
