import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

const enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[];
}

class App extends React.Component<{}, IState> {
  public state = {
    board: [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None
    ]
  };

  public renderCell = (index: number) => {
    return <div className="cell" />;
  };

  public renderBoard = () => {
    const { board } = this.state;

    return (
      <div className="board-container">
        {board.map((value, key) => this.renderCell(key))}
      </div>
    );
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tic Tact Toe with React JS</h1>
        </header>

        {this.renderBoard()}
      </div>
    );
  }
}

export default App;
