import {Component, Input} from '@angular/core';
import {NgForOf, NgOptimizedImage} from '@angular/common';

interface Comment {
  content: string;
  nbStars: number;
  firstName: string;
  lastName: string;
}

const FIRST_NAMES: string[] = [
  "Jean-Michel", "Marie", "Pierre", "Sophie", "Lucas", "Emma", 
  "Thomas", "Léa", "Nicolas", "Julie", "Antoine", "Chloé",
  "Maxime", "Sarah", "Alexandre", "Laura"
];

const LAST_NAMES: string[] = [
  "DUPONT", "MARTIN", "BERNARD", "PETIT", "DUBOIS", "THOMAS",
  "ROBERT", "RICHARD", "MOREAU", "SIMON", "LAURENT", "MICHEL",
  "LEFEBVRE", "LEROY", "ROUX", "DAVID"
];

const COMMENTS: Comment[] = [
  { content: "Le burger était parfait !", nbStars: 5, firstName: "", lastName: "" },
  { content: "Pas mal, mais la cuisson du steak était moyenne", nbStars: 3, firstName: "", lastName: "" },
  { content: "Service rapide, burger délicieux", nbStars: 4, firstName: "", lastName: "" },
  { content: "La présentation laisse à désirer...", nbStars: 2, firstName: "", lastName: "" },
  { content: "Excellent travail d'équipe !", nbStars: 5, firstName: "", lastName: "" },
  { content: "Le fromage n'était pas bien fondu", nbStars: 3, firstName: "", lastName: "" },
  { content: "Meilleur burger de ma vie !", nbStars: 5, firstName: "", lastName: "" },
  { content: "Un peu trop de sauce à mon goût", nbStars: 4, firstName: "", lastName: "" },
  { content: "La salade n'était pas très fraîche", nbStars: 2, firstName: "", lastName: "" },
  { content: "Parfaitement assemblé, bravo !", nbStars: 5, firstName: "", lastName: "" }
];

@Component({
  selector: 'app-comment-panel',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './comment-panel.component.html',
  styleUrl: './comment-panel.component.scss'
})
export class CommentPanelComponent {
  @Input() firstNameUser: string = "";
  @Input() lastNameUser: string = "";
  @Input() commentContent: string = "";
  @Input() nbStars: number = 3;
  readonly maxNbStars: number = 5;

  private static getRandomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  static getRandomComment(): Comment {
    const randomComment = { ...this.getRandomElement(COMMENTS) };
    randomComment.firstName = this.getRandomElement(FIRST_NAMES);
    randomComment.lastName = this.getRandomElement(LAST_NAMES);
    return randomComment;
  }
}
