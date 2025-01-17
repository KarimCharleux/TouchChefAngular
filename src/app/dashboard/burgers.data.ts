import {Burger} from './burger.model';

export const BURGERS: Burger[] = [
  {
    id: 1,
    name: 'Classic Burger 🍔',
    imageUrl: 'assets/burger/burger1.png',
    recipeItems: [
      {
        ingredient: {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Steak haché', imageUrl: 'assets/burger/steak.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Salade', imageUrl: 'assets/burger/salad.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Fromage', imageUrl: 'assets/burger/cheese.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'},
        numberOfIngredients: 1,
      },
    ],
    tasks: [
      {
        id: '1_1',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande une planche'},
          {order: 3, description: 'Couper la viande avec la tranche de la main'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1,
        isCompleted: false,
        assignedCooks: []
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
        workStation: 'grill',
        isCompleted: false,
        assignedCooks: []
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
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '1_4',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '1_5',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Déplacer la tomate sur la planche à découper'},
          {order: 3, description: 'Couper la tomate en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '1_6',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      }
    ]
  },
  {
    id: 2,
    name: 'Salade de légumes',
    imageUrl: 'assets/burger/salad.png',
    recipeItems: [
      {
        ingredient: {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Steak haché', imageUrl: 'assets/burger/steak.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Salade', imageUrl: 'assets/burger/salad.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Fromage', imageUrl: 'assets/burger/cheese.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'},
        numberOfIngredients: 1,
      },
    ],
    tasks: [
      {
        id: '2_1',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Déplacer la tomate sur la planche à découper'},
          {order: 3, description: 'Couper la tomate en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_2',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_3',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_4',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Déplacer la tomate sur la planche à découper'},
          {order: 3, description: 'Couper la tomate en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_5',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_6',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_7',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '2_8',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
    ]
  },
  {
    id: 3,
    name: 'Double Cheese Burger',
    imageUrl: 'assets/burger/burger2.png',
    recipeItems: [
      {ingredient: {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'}, numberOfIngredients: 1},
      {ingredient: {name: 'Galette végétarienne', imageUrl: 'assets/burger/veggie-patty.png'}, numberOfIngredients: 1},
      {ingredient: {name: 'Salade', imageUrl: 'assets/burger/salad.png'}, numberOfIngredients: 1},
      {ingredient: {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'}, numberOfIngredients: 1},
      {ingredient: {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'}, numberOfIngredients: 1},
    ],
    tasks: [
      {
        id: '3_1',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '3_2',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '3_3',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Couper la tomate sur la planche'},
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: [],
      },
      {
        id: '3_4',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande une planche'},
          {order: 3, description: 'Couper la viande avec la tranche de la main'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1,
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '3_5',
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
        workStation: 'grill',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '3_6',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '3_7',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
    ],
  },
  {
    id: 4,
    name: 'Double steak burger',
    imageUrl: 'assets/burger/burger2.png',
    recipeItems: [
      {
        ingredient: {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Steak haché', imageUrl: 'assets/burger/steak.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Salade', imageUrl: 'assets/burger/salad.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Fromage', imageUrl: 'assets/burger/cheese.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'},
        numberOfIngredients: 1,
      },
    ],
    tasks: [
      {
        id: '4_1',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '4_2',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '4_3',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '4_4',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Couper la tomate sur la planche'},
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: [],
      },
      {
        id: '4_5',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande une planche'},
          {order: 3, description: 'Couper la viande avec la tranche de la main'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1,
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '4_6',
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
        workStation: 'grill',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '4_7',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande une planche'},
          {order: 3, description: 'Couper la viande avec la tranche de la main'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1,
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '4_8',
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
        workStation: 'grill',
        isCompleted: false,
        assignedCooks: []
      },
    ]
  },
  {
    id: 5,
    name: 'Triple tomate burger',
    imageUrl: 'assets/burger/burger2.png',
    recipeItems: [
      {
        ingredient: {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Steak haché', imageUrl: 'assets/burger/steak.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Salade', imageUrl: 'assets/burger/salad.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Fromage', imageUrl: 'assets/burger/cheese.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'},
        numberOfIngredients: 1,
      },
    ],
    tasks: [
      {
        id: '5_1',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande une planche'},
          {order: 3, description: 'Couper la viande avec la tranche de la main'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1,
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '5_2',
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
        workStation: 'grill',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '5_3',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Couper la tomate sur la planche'},
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: [],
      },
      {
        id: '5_4',
        name: 'Couper une tranche de fromage',
        subTasks: [
          {order: 1, description: 'Prendre du fromage'},
          {order: 2, description: 'Le déplacer sur la planche à découper'},
          {order: 3, description: 'Couper le fromage en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🧀",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '5_5',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Couper la tomate sur la planche'},
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: [],
      },
      {
        id: '5_6',
        name: 'Couper une tranche de tomate',
        subTasks: [
          {order: 1, description: 'Prendre une tomate'},
          {order: 2, description: 'Couper la tomate sur la planche'},
        ],
        nbCooksNeeded: 1,
        icons: "🔪🍅",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: [],
      },
    ]
  },
  {
    id: 6,
    name: 'Double salade burger',
    imageUrl: 'assets/burger/burger.png',
    recipeItems: [
      {
        ingredient: {name: 'Haut pain burger', imageUrl: 'assets/burger/bread-top.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Steak haché', imageUrl: 'assets/burger/steak.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Salade', imageUrl: 'assets/burger/salad.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Tomate', imageUrl: 'assets/burger/tomato.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Fromage', imageUrl: 'assets/burger/cheese.png'},
        numberOfIngredients: 1,
      },
      {
        ingredient: {name: 'Bas pain burger', imageUrl: 'assets/burger/bread-bottom.png'},
        numberOfIngredients: 1,
      },
    ],
    tasks: [
      {
        id: '6_1',
        name: 'Préparer la viande',
        subTasks: [
          {order: 1, description: 'Prendre la viande dans la boutique'},
          {order: 2, description: 'Déplacer la viande une planche'},
          {order: 3, description: 'Couper la viande avec la tranche de la main'}
        ],
        workStation: 'planche',
        nbCooksNeeded: 1,
        icons: "🔪🥩",
        quantity: 1,
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '6_2',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '6_3',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '6_4',
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
        workStation: 'grill',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '6_5',
        name: 'Laver une salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade'},
          {order: 2, description: 'Déplacer la salade dans l\'évier'},
          {order: 3, description: 'Laver la salade'}
        ],
        nbCooksNeeded: 1,
        icons: "💦🥬",
        quantity: 1,
        workStation: 'evier',
        isCompleted: false,
        assignedCooks: []
      },
      {
        id: '6_6',
        name: 'Couper une tranche de salade',
        subTasks: [
          {order: 1, description: 'Prendre une salade bien lavée'},
          {order: 2, description: 'Déplacer la salade sur la planche à découper'},
          {order: 3, description: 'Couper la salade en tranches avec la tranche de la main'}
        ],
        nbCooksNeeded: 1,
        icons: "🔪🥬",
        quantity: 1,
        workStation: 'planche',
        isCompleted: false,
        assignedCooks: []
      },
    ]
  }
];
