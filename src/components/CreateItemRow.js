import React from "react";

import { ENABLED, DISABLED, LOADING } from "../button-states";
import { TYPES, FUEL_TYPES } from "../types";

import Api from "../api";

class CreateItemRow extends React.Component {

  constructor(props) {
    super(props);

    this.vehicle = {
      name: "",
      coordinates: { x: "", y: "" },
      type: TYPES[0],
      enginePower: "",
      fuelType: FUEL_TYPES[0],
      fuelConsumption: ""
    };

    this.state = { createButtonState: DISABLED };
  }

  isValid() {
    if (this.vehicle.name.length === 0) return false;
    const coords = this.vehicle.coordinates;
    if (isNaN(parseInt(coords.x))) return false;
    if (isNaN(parseInt(coords.y))) return false;
    if (isNaN(parseInt(this.vehicle.enginePower))) return false;
    if (isNaN(parseInt(this.vehicle.fuelConsumption))) return false;
    return true;
  }

  validate() {
    const createButtonState = this.isValid() ? ENABLED : DISABLED;
    this.setState({ createButtonState });
  }

  onInput = (prop, event) => {
    this.vehicle[prop] = event.target.value;
    this.validate();
  }

  onCoordInput = (prop, event) => {
    this.vehicle.coordinates[prop] = event.target.value;
    this.validate();
  }

  onCreateClick = () => {
    this.setState({ createButtonState: LOADING });
    Api
      .create(this.vehicle)
      .then(() => this.props.onCreate(this.vehicle))
      .catch(err => console.log(err))
      .finally(() => this.setState({ createButtonState: ENABLED }));
  }

  createInput(prop, callback) {
    if (!callback) {
      callback = this.onInput;
    }
    return (
      <input 
        className={prop === "name" ? "text" : "number"}
        disabled={this.state.createButtonState === LOADING}
        onChange={callback.bind(null, prop)}
      />
    );
  }

  createSelect(options, prop) {
    return (
      <select 
        disabled={this.state.createButtonState === LOADING}
        onChange={this.onInput.bind(null, prop)}
      >
        {options.map(it => <option value={it}>{it}</option>)}
      </select>
    );
  } 

  createCreateButton() {
    const state = this.state.createButtonState;
    return (
      <button
        disabled={state !== ENABLED}
        onClick={this.onCreateClick}
      >
        {state === LOADING ? "Creating.." : "Create"} 
      </button>
    );
  }

  render() {
    return (
      <tr>
        <td></td>
        <td>{this.createInput("name")}</td>
        <td></td>
        <td>{this.createInput("x", this.onCoordInput)}</td>
        <td>{this.createInput("y", this.onCoordInput)}</td>
        <td>{this.createSelect(TYPES, "type")}</td>
        <td>{this.createInput("enginePower")}</td>
        <td>{this.createSelect(FUEL_TYPES, "fuelType")}</td>
        <td>{this.createInput("fuelConsumption")}</td>
        <td>{this.createCreateButton()}</td>
        <td></td>
      </tr>
    );
  }
}

export default CreateItemRow;
