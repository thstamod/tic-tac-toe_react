import React from "react"

class Square extends React.Component {
  state = { value: null }
  getValue = () => {
    this.setState({ value: "X" })
    this.props.onClick(this.props.id, "X")
  }

  static getDerivedStateFromProps(props, state) {
    console.log(state.value)
    //console.log(state)
    console.log(props.value)
    if (props.value === "O") {
      return { value: props.value }
    }
    return null
  }

  set(value) {
    this.setState({ value })
  }

  render() {
    return (
      <div onClick={this.getValue} className="square">
        {this.state.value}
      </div>
    )
  }
}

export default Square
