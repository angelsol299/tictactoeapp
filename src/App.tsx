import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

type ONGOING_GAME = -1;

const ONGOING_GAME = -1;

const enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[];
  nextPlayerTurn: Player;
  gameIsWon: Player | ONGOING_GAME;
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
    ],
    gameIsWon: ONGOING_GAME,
    nextPlayerTurn: Player.One
  };

  public checkIfGameIsOver = (board: Player[]) => {
    if (
      board[0] === board[1] &&
      board[1] === board[2] &&
      board[2] !== Player.None
    ) {
      return board[0];
    } else if (
      board[3] === board[4] &&
      board[4] === board[5] &&
      board[5] !== Player.None
    ) {
      return board[3];
    } else if (
      board[6] === board[7] &&
      board[7] === board[8] &&
      board[8] !== Player.None
    ) {
      return board[6];
    } else if (
      board[0] === board[3] &&
      board[3] === board[6] &&
      board[6] !== Player.None
    ) {
      return board[0];
    } else if (
      board[1] === board[4] &&
      board[4] === board[7] &&
      board[7] !== Player.None
    ) {
      return board[1];
    } else if (
      board[2] === board[5] &&
      board[5] === board[8] &&
      board[8] !== Player.None
    ) {
      return board[2];
    } else if (
      board[0] === board[4] &&
      board[4] === board[8] &&
      board[8] !== Player.None
    ) {
      return board[0];
    } else if (
      board[2] === board[4] &&
      board[4] === board[6] &&
      board[6] !== Player.None
    ) {
      return board[2];
    }

    for (const player of board) {
      if (player === Player.None) {
        return ONGOING_GAME;
      }
    }

    /*
    for(let i = 0; i < board.length; i++){
      if (board[i] === Player.None) {
        return ONGOING_GAME;
      }
      return;
    }
    
    board.forEach(player => {
      if (player === Player.None) {
        return ONGOING_GAME;
      }
      return;
    });*/

    return Player.None;
  };

  public createOnClickHandler = (index: number) => () => {
    const { board, nextPlayerTurn, gameIsWon } = this.state;

    if (gameIsWon !== ONGOING_GAME && board[index] !== Player.None) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = nextPlayerTurn;
    const newGameIsWon = this.checkIfGameIsOver(newBoard);

    this.setState({
      board: newBoard,
      gameIsWon: newGameIsWon,
      nextPlayerTurn: 3 - nextPlayerTurn
    });
  };

  public renderCell = (index: number) => {
    const { board } = this.state;
    return (
      <div
        className="cell"
        onClick={this.createOnClickHandler(index)}
        data-player={board[index]}
      />
    );
  };

  public renderStatus = () => {
    const { gameIsWon } = this.state;
    const winningText =
      gameIsWon !== Player.None
        ? `Player ${gameIsWon} won`
        : "The game is a draw!";
    return (
      <div style={{ marginTop: "30px" }}>
        {"Player 1 is green"} <br />
        {"Player 2 is red"} <br />
        {gameIsWon === ONGOING_GAME ? "game is ongoing" : winningText}
      </div>
    );
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
        {this.renderStatus()}
      </div>
    );
  }
}

export default App;
