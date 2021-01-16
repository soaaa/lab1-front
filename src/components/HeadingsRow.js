import React from "react";

import OrderButton from "./OrderButton";

import { NONE } from "../orders";

class HeadingsRow extends React.Component {

  constructor(props) {
    super(props);

    this.orders = [];

    this.onIdOrderChanged = this.onOrderChanged.bind(this, "id");
    this.onNameOrderChanged = this.onOrderChanged.bind(this, "name");
    this.onCreationDateOrderChanged = this.onOrderChanged.bind(this, "creation_date");
    this.onTypeOrderChanged = this.onOrderChanged.bind(this, "type");
    this.onEnginePowerOrderChanged = this.onOrderChanged.bind(this, "engine_power");
    this.onFuelTyppOrderChanged = this.onOrderChanged.bind(this, "fuel_type");
    this.onFuelConsumptionOrderChanged = this.onOrderChanged.bind(this, "fuel_consumption");
  }

  onOrderChanged(column, order) {
    this.orders = this.orders.filter(order => order.column !== column);
    if (order !== NONE) {
      this.orders.push({ column, order });
    }
    this.props.onChanged(this.orders);
  }

  render() {
    return (
      <tr>
        <td>ID <OrderButton column="id" onChanged={this.onIdOrderChanged}/></td>
        <td>Name <OrderButton column="name" onChanged={this.onNameOrderChanged}/></td>
        <td>
          Creation date
          <OrderButton column="creation_date" onChanged={this.onCreationDateOrderChanged}/>
        </td>
        <td>X</td>
        <td>Y</td>
        <td>Type <OrderButton column="type" onChanged={this.onTypeOrderChanged}/></td>
        <td>
          Engine power
          <OrderButton column="engine_power" onChanged={this.onEnginePowerOrderChanged}/>
        </td>
        <td>
          Fuel type
          <OrderButton column="fuel_type" onChanged={this.onFuelTypeOrderChanged}/>
        </td>
        <td>
          Fuel consumption
          <OrderButton column="fuel_consumption" onChanged={this.onFuelConsumptionOrderChanged}/>
        </td>
      </tr>
    );
  }
}

export default HeadingsRow;
