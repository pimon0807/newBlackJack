import { BlackJackCardConfig } from "../gameConfig/blackJackConfig";
import { BlackJackCard } from "./cardModel";
import { Deck } from "../gameConfig/modelInterfaces";

export class BlackJackDeck implements Deck {
  cards: Array<BlackJackCard>;

  constructor(readonly gameType: string) {
    this.cards = [];
    this.gameType = "blackjack";
    this.resetDeck();
  }

  resetDeck(): void {
    for (const suit of BlackJackCardConfig.suits) {
      for (const rank of BlackJackCardConfig.rank) {
        this.cards = [...this.cards, new BlackJackCard(suit, rank)];
      }
    }
    this.shuffle();
  }

  private shuffle(): void {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  drawOne(): BlackJackCard | undefined {
    return this.cards.pop();
  }
}
