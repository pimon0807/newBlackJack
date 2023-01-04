import React from "react";
import { Controller } from "./controllers/blackJackController";

const App: React.FC = () => {
  new Controller();
  return <div id="root">p</div>;
};

export default App;
