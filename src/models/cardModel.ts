import { BlackJackCardConfig } from "../gameConfig/blackJackConfig";
import { Card } from "../gameConfig/modelInterfaces";

export class BlackJackCard implements Card {
  constructor(readonly suit: string, readonly rank: string) {
    this.suit = suit;
    this.rank = rank;
  }

  getSuit(): string {
    return this.suit;
  }

  getRank(): string {
    return this.rank;
  }

  getRankNumber(): number {
    if (this.rank === "A") return 11;
    else if (BlackJackCardConfig.faceCard.includes(this.rank)) {
      return 10;
    } else {
      return parseInt(this.rank);
    }
  }
}
