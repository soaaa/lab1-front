import React from  "react";

import { NONE, ASC, DESC, getNextOrder } from "../orders";


class OrderButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = { order: NONE };
  }

  onClick = () => {
    const nextOrder = getNextOrder(this.state.order);
    this.setState({ order: nextOrder });
    this.props.onChanged(nextOrder);
  }

  createText() {
    switch (this.state.order) {
      case NONE: return "-";
      case ASC: return "A";
      case DESC: return "D";
    }
  }

  render() {
    return <button onClick={this.onClick}>{this.createText()}</button>;
  }
}

export default OrderButton;
