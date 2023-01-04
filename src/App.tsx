import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Initial from "./pages/Initial";
import Game from "./pages/Game";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Initial />} />
          <Route path="game/" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
