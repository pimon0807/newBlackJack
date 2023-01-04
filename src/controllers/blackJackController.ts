import { BlackJackTable } from "../models/tableModel";
import { View } from "../views/blackJackView";

export class Controller {
  constructor() {
    View.createInitialPage();
    this.startBtn();
  }

  startGame(name: string, gameType: string): void {
    if (gameType === "blackjack") {
      const table = new BlackJackTable(name);
      this.renderTable(table);
    }
  }

  startBtn(): void {
    const gameStartBtn = document.getElementById("gameStartBtn");

    //inputされたuserNameとgameTypeを取得
    gameStartBtn?.addEventListener("click", () => {
      const userName = document.getElementById("userName") as HTMLInputElement;
      const gameType = document.getElementsByName("gameType");
      if (userName.value === "") {
        alert("Please Input Name");
      } else {
        //radioで選択している要素の検索
        for (let i = 0; i < gameType.length; i++) {
          const gameName = gameType.item(i) as HTMLInputElement;
          if (gameName.checked) {
            this.startGame(userName.value, gameName.value);
          }
        }
      }
    });
  }

  renderTable(table: BlackJackTable): void {
    if (table.gamePhase === "gameOver") {
      View.displayResult(table.players[1]);
      View.createNewGameBtn(table.players[1].chips);
      View.createGameOverModal();
      //const modal = alert(document.getElementById("gameovermodal")!);
      //modal.show();
      this.moveInitialPageBtn();
      return;
    } else if (table.gamePhase === "roundOver") {
      View.displayResult(table.players[1]);
      View.createNewGameBtn(table.players[1].chips);
      View.createResultModal(table);
      //const modal = alert(document.getElementById("resultmodal")!);
      //modal.show();
      this.moveNextRoundBtn(table);
      return;
    }

    const page = document.getElementById("root") as HTMLLIElement;
    page.innerHTML = "";
    View.createMainPage(table);

    if (table.gamePhase === "acting") {
      View.faceDownCard(table);
    } else if (table.gamePhase === "evaluatingWinners") {
      View.faceUpCard(table);
    }

    //userの時はbet,actionViewを表示して入力を待ってからrender
    if (table.getTurnPlayer().playerType === "user") {
      if (table.gamePhase === "betting") {
        View.createBetPhase(table);
        this.chipBtn(table);
        this.betBtn(table);
        this.resetBetBtn(table);
        return;
      } else if (
        table.gamePhase === "acting" &&
        (table.getTurnPlayer().status === "wait" ||
          table.getTurnPlayer().status === "hit")
      ) {
        if (table.getTurnPlayer().getHandScore() === 21) {
          table.getTurnPlayer().status === "blackjack";
        } else {
          View.createActionPhase(table);
          this.actionBtn(table);
          if (table.turnCounter > 5) {
            View.disabledSecondActionBtn();
          }
          return;
        }
      }
    }

    setTimeout(() => {
      table.haveTurn();
      this.renderTable(table);
    }, 1500);
  }

  getBetAmount(table: BlackJackTable): void {
    table.haveTurn(table.getTurnPlayer().betAmount);
    this.renderTable(table);
  }

  betBtn(table: BlackJackTable): void {
    document.getElementById("betbtn")?.addEventListener("click", () => {
      this.getBetAmount(table);
    });
  }

  chipBtn(table: BlackJackTable): void {
    for (const chip of table.betDenominations) {
      const chipBtn = document.getElementById(`${chip}`) as HTMLInputElement;
      chipBtn?.addEventListener("click", () => {
        const okbtn = document.getElementById("betbtn") as HTMLInputElement;
        okbtn.disabled = false;
        table.getTurnPlayer().betAmount += chip;
        this.disabledBetBtn(table);
      });
    }
  }

  resetBetBtn(table: BlackJackTable): void {
    document.getElementById("resetbetbtn")?.addEventListener("click", () => {
      table.getTurnPlayer().betAmount = 0;
      document.querySelectorAll("#betamount")[0].innerHTML = `<h4>You Bet ${
        table.getTurnPlayer().betAmount
      }</h4>`;
      const okbtn = document.getElementById("betbtn") as HTMLInputElement;
      okbtn.disabled = true;
      const betBtns = document
        .querySelector("#chips")
        ?.querySelectorAll("button");
      for (const betBtn of betBtns!) {
        betBtn.disabled = false;
      }
    });
  }

  disabledBetBtn(table: BlackJackTable): void {
    const betBtns = document
      .querySelector("#chips")
      ?.querySelectorAll("button");
    for (const betBtn of betBtns!) {
      const curr = betBtn as HTMLInputElement;
      if (
        table.getTurnPlayer().betAmount + parseInt(curr.value) >
        table.getTurnPlayer().chips
      ) {
        betBtn.disabled = true;
      }
    }
  }

  actionBtn(table: BlackJackTable): void {
    for (const action of table.getTurnPlayer().actions) {
      const actionBtn = document.getElementById(`${action}`);
      actionBtn?.addEventListener("click", () => {
        table.haveTurn(action);
        this.renderTable(table);
      });
    }
  }

  moveNextRoundBtn(table: BlackJackTable): void {
    document.getElementById("Next")?.addEventListener("click", () => {
      table.blackjackClearPlayerHandsAndBets();
      this.renderTable(table);
    });
  }

  moveInitialPageBtn(): void {
    document.getElementById("New")?.addEventListener("click", () => {
      document.querySelectorAll("#root")[0].innerHTML = "";
      new Controller();
    });
  }
}
