import React from "react";
import { useLocation } from "react-router-dom";
import { View } from "../views/blackJackView";

const Game: React.FC = () => {
  const { state } = useLocation();
  return (
    <div
      className="vh-100
        bg-success
        d-flex
        justify-content-center
        align-items-center"
    >
      <div className="col-12">
        <div className="pt-5 container">
          <h3 className="m-0 text-center text-white rem3">Dealer</h3>
          <p id="housestatus" className="text-center">
            status: ${state.currTable.house.status}
          </p>
          <div
            id="${
                  state.currTable.players[0].name
                }"
            className="justify-content-center pt-3 pb-5 row"
          >
            <div className="col-3 justify-content-center row">
              ${View.createCardView(state.currTable.players[0])}
            </div>
          </div>
          <div className="">
            <div id="playersDiv" className="d-flex justify-content-between">
              <div id="${state.currTable.players[2]}" className="col-3">
                <h3 className="m-0 text-white text-center rem3">
                  ${state.currTable.players[2].name}
                </h3>
                <p id="player2status" className="text-center">
                  status: ${state.currTable.players[2].status}
                </p>
                <p className="text-center">
                  bet: ${state.currTable.players[2].betAmount}
                </p>
                <p className="text-center">
                  chip: ${state.currTable.players[2].chips}
                </p>
                <div className="d-flex justify-content-center row">
                  ${View.createCardView(state.currTable.players[2])}
                </div>
              </div>

              <div id="player1info" className="col-3">
                <h3 className="m-0 text-white text-center rem3">
                  ${state.currTable.players[1].name}
                </h3>
                <p id="player1status" className="text-center">
                  status: ${state.currTable.players[1].status}
                </p>
                <p className="text-center">
                  bet: ${state.currTable.players[1].betAmount}
                </p>
                <p className="text-center">
                  chip: ${state.currTable.players[1].chips}
                </p>
                <div className="d-flex justify-content-center row">
                  ${View.createCardView(state.currTable.players[1])}
                </div>
              </div>

              <div id="${state.currTable.players[3]}" className="col-3">
                <h3 className="m-0 text-white text-center rem3">
                  ${state.currTable.players[3].name}
                </h3>
                <p id="player3status" className="text-center">
                  status: ${state.currTable.players[3].status}
                </p>
                <p className="text-center">
                  bet: ${state.currTable.players[3].betAmount}
                </p>
                <p className="text-center">
                  chip: ${state.currTable.players[3].chips}
                </p>
                <div className="d-flex justify-content-center row">
                  ${View.createCardView(state.currTable.players[3])}
                </div>
              </div>
            </div>
          </div>
          <div
            id="playerArea"
            className="d-flex justify-content-center mt-5"
          ></div>
        </div>
      </div>
      `;
    </div>
  );
};

export default Game;
