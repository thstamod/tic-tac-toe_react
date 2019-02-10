import React from "react"
import Square from "./Square"

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { squares: Array(9).fill(null), turn: "Human" }
    this.firstMoveDone = false
    this.winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  }

  setValue = (position, value) => {
    console.log(position, value)
    let squares = this.state.squares
    squares[position] = value
    this.setState({ squares, turn: this.changeTurns() }, this.turn)
  }

  computerTurn = symbol => {
    if (!this.firstMoveDone) {
      this.setFirstMove(symbol)
    } else {
      this.calculateRestMoves()
    }
  }

  calculateRestMoves = () => {
    const board = this.state.squares
    let analysis = []
    this.winningLines.forEach(line => {
      let analysisLine = [0, 0, 0]
      for (var i = 0; i < line.length; i++) {
        if (board[line[i]] === "X") {
          analysisLine[0]++
        }
        if (board[line[i]] === "O") {
          analysisLine[1]++
        }
        analysis.push(analysisLine)
      }

      console.log(analysis)
    })
  }

  changeTurns = () => {
    return this.state.turn === "Human" ? "Computer" : "Human"
  }

  turn() {
    if (this.state.turn === "Human") {
      return
    } else {
      this.computerTurn("O")
    }
  }

  setFirstMove = symbol => {
    this.firstMoveDone = true
    const board = this.state.squares
    const possibleFirstMoves = [0, 2, 4, 6, 8]
    const rand = Math.floor(Math.random() * possibleFirstMoves.length)
    if (board[possibleFirstMoves[rand]] === null) {
      this.setValue(possibleFirstMoves[rand], symbol)
    }
  }

  calculateWinner = squares => {
    for (let i = 0; i < this.winningLines.length; i++) {
      const [a, b, c] = this.winningLines[i]
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null
  }

  renderSquare(i) {
    return (
      <Square onClick={this.setValue} id={i} value={this.state.squares[i]} />
    )
  }
  render() {
    //console.log(this.state.squares);
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}
export default Board