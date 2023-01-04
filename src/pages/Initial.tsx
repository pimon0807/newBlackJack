import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlackJackTable } from "../models/tableModel";

const Initial: React.FC = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const table = new BlackJackTable(name);
  const startGame = (table: BlackJackTable): void => {
    navigate("/game", {
      state: {
        currTable: table,
      },
    });
  };
  return (
    <div
      className="vh-100
    d-flex
    flex-column
    justify-content-center
    align-items-center
    bg-success
    text-center"
    >
      <h1>BlackJack & Poker</h1>
      <h3>Select Game and Input Your Name!</h3>
      <div className="col-4 mt-4">
        <div className="radio">
          <label>
            <input type="radio" name="gameType" value="blackjack" />{" "}
            <span>BlackJack</span>
          </label>
        </div>
        <div className="radio mt-3">
          <label>
            <input type="radio" name="gameType" value="poker" />{" "}
            <span>Poker</span>
          </label>
        </div>
        <div className="my-4">
          <input
            id="userName"
            type="text"
            className="form-control"
            placeholder="Player Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <div className="col-6">
        <p id="gameStartBtn" className="dbtn" onClick={() => startGame(table)}>
          Game Start
        </p>
      </div>
    </div>
  );
};

export default Initial;
