import React from "react";
import Board from "./Board";

class App extends React.Component {
    render() {
        return (
            <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
        )
    }
}

export default App;