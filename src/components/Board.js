import React from "react"
import Square from "./Square"

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      turn: "Human",
      status: "in progress",
      gameIsFinished: false
    }
    this.firstMoveDone = false
    this.moveCompleted = false
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
    if (!this.state.gameIsFinished) {
      console.log(position, value)
      let squares = this.state.squares
      squares[position] = value
      this.moveCompleted = true
      this.setState({ squares, turn: this.changeTurns() }, this.turn)
    }
  }

  computerTurn = symbol => {
    if (!this.firstMoveDone) {
      this.setFirstMove(symbol)
    } else {
      this.calculateRestMoves()
    }
  }
  changeFlag = flag => {
    flag = !flag
  }
  calculateRestMoves = () => {
    this.moveCompleted = false
    console.log("run calculate rest moves")
    const board = this.state.squares
    let analysis = []
    this.winningLines.forEach((line, index) => {
      let analysisLine = [0, 0, 0]
      for (var i = 0; i < line.length; i++) {
        if (board[line[i]] === "X") {
          analysisLine[0]++
        }
        if (board[line[i]] === "O") {
          analysisLine[1]++
        }
        analysisLine[2] = index
      }
      analysis.push(analysisLine)
    })
    //console.log(analysis)

    let possibleLoseNextMove = analysis.filter(elem => {
      return elem[0] > 1 && elem[1] === 0
    })
    let possibleNextMoveO = analysis.filter(elem => {
      return elem[1] > 1 && elem[0] === 0
    })

    if (possibleNextMoveO.length > 0 && !this.moveCompleted) {
      for (let i = 0; i < possibleNextMoveO.length; i++) {
        this.winningLines[possibleNextMoveO[i][2]].forEach(elem => {
          if (board[elem] === null) {
            this.moveCompleted = true
            // this.changeFlag(moveCompleted);
            return this.setValue(elem, "O")
          }
        })
      }
    }

    if (possibleLoseNextMove.length > 0 && !this.moveCompleted) {
      // var stateUpdated = false
      for (let i = 0; i < possibleLoseNextMove.length; i++) {
        this.winningLines[possibleLoseNextMove[i][2]].forEach(elem => {
          if (board[elem] === null) {
            // this.changeFlag(stateUpdated)
            // moveCompleted =  this.changeFlag(moveCompleted);
            this.moveCompleted = true
            return this.setValue(elem, "O")
          }
        })
      }
    }

    if (
      possibleLoseNextMove.length === 0 &&
      possibleNextMoveO.length === 0 &&
      !this.moveCompleted
    ) {
      console.log("----------------------")
      console.log("winning lines: ", this.winningLines)
      console.log("analysis: ", analysis)
      console.log("state: ", this.state.squares)
      console.log("----------------------")
      let tempLines = []
      let possibleMoves = []

      analysis.forEach(_elem => {
        if (_elem[1] === 1 && _elem[0] === 0) {
          tempLines.push(_elem)
        }
      })
      console.log(tempLines)
      tempLines.forEach((elem, index) => {
        this.winningLines[elem[2]].forEach(_elem => {
          if (board[_elem] === null) {
            this.moveCompleted = true
            possibleMoves.push(_elem)
          }
        })
      })
      if (possibleMoves.length > 0) {
        this.setValue(possibleMoves[0], "O")
      } else {
        let available = []
        board.forEach((elem, index) => {
          if (elem === null) {
            available.push(index)
          }
        })
        if (available.length > 0) {
          this.setValue(this.getRandom(available.length), "O")
        }
      }
    }
  }

  changeTurns = () => {
    return this.state.turn === "Human" ? "Computer" : "Human"
  }

  turn() {
    if (!this.calculateWinner(this.state.squares)) {
      if (this.state.turn === "Human") {
        return
      } else {
        this.computerTurn("O")
      }
    } else {
      this.setState({ status: "game end", gameIsFinished: true })
    }
  }

  setFirstMove = symbol => {
    const board = this.state.squares
    const possibleFirstMoves = [0, 2, 6, 8]
    this.firstMoveDone = true
    if (this.state.squares[4] === null) {
      this.setValue(4, symbol)
    } else {
      let played = false
      while (played === false) {
        let random = this.getRandom(possibleFirstMoves.length)
        if (board[random] === null) {
          this.setValue(possibleFirstMoves[random], symbol)
          played = true
        }
      }
    }
  }

  getRandom = number => {
    return Math.floor(Math.random() * number)
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
        <div>{this.state.status}</div>
      </div>
    )
  }
}
export default Board
