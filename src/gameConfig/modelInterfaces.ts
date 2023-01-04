export interface Card {
  readonly suit: string;
  readonly rank: string;
  getRankNumber(): number;
}

export interface Deck {
  readonly gameType: string;
  readonly cards: Array<Card>;
}

export interface Player {
  name: string;
  playerType: string;
  gameType: string;
  chips: number;
  betAmount: number;
  hand: Card[];
  status: string;
  isGameOver: boolean;
}
