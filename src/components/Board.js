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
  changeFlag = flag => {
    flag = !flag
  }
  calculateRestMoves = () => {
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
      return elem[0] > 1
    })
    let possibleNextMoveO = analysis.filter(elem => {
      return elem[1] > 1
    })

    console.log(possibleNextMoveO)
    if (possibleNextMoveO.length > 0) {
      for (let i = 0; i < possibleNextMoveO.length; i++) {
        this.winningLines[possibleNextMoveO[i][2]].forEach(elem => {
          if (board[elem] === null) {
            return this.setValue(elem, "O")
          } else {
            possibleNextMoveO.slice(i, 1)
          }
        })
      }
    }

    if (possibleLoseNextMove.length > 0) {
      var stateUpdated = false
      for (let i = 0; i < possibleLoseNextMove.length; i++) {
        this.winningLines[possibleLoseNextMove[i][2]].forEach(elem => {
          if (board[elem] === null) {
            this.changeFlag(stateUpdated)
            return this.setValue(elem, "O")
          }
        })
      }
    }

    if (possibleLoseNextMove.length === 0 && possibleNextMoveO.length === 0) {
      console.log("winning lines: ", this.winningLines)
      console.log("analysis: ", analysis)
      console.log("state: ", this.state.squares)

      let possibleMoves = []
      let Opos = []
      board.forEach((elem, index) => {
        if (elem === "O") {
          Opos.push(index)
        }
      })
      Opos.forEach(elem => {
        this.winningLines.forEach((elem, index) => {
          elem.forEach((inner_elem, index) => {
            console.log(inner_elem)
          })
        })
      })

      console.log(possibleMoves)
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
      console.log("game ends")
    }
  }

  setFirstMove = symbol => {
    //for debug perposes
    // this.setValue(3, symbol)
    this.firstMoveDone = true
    if (this.state.squares[4] === null) {
      this.setValue(4, symbol)
    } else {
      this.setValue(6, symbol)
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
