import React from  "react";

import { getNextOrder, getOrderSymbol } from "../orders";

import { NONE, ASC, DESC } from "../orders";


class OrderButton extends React.Component {

  constructor(props) {
    super(props);

    this.state = { order: NONE };
  }

  onClick = () => {
    const nextOrder = getNextOrder(this.state.order);
    this.setState({ order: nextOrder });
    this.props.onChange(nextOrder);
  }

  createText() {
    return getOrderSymbol(this.state.order);
  }

  render() {
    return (
      <button 
        className="btn btn-primary"
        onClick={this.onClick}
      >
        {this.createText()}
      </button>
    );
  }
}

export default OrderButton;
