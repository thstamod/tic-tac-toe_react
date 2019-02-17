import React from "react"

class Square extends React.Component {
  getValue = () => {
    this.props.onClick(this.props.id, "X")
  }

  render() {
    return (
      <div onClick={this.getValue} className="square">
        {this.props.value}
      </div>
    )
  }
}

export default Square
