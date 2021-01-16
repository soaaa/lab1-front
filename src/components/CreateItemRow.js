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

  onNameInput = (event) => {
    this.vehicle.name = event.target.value;
    this.validate();
  }
  
  onXInput = (event) => {
    this.vehicle.coordinates.x = event.target.value;
    this.validate();
  }

  onYInput = (event) => {
    this.vehicle.coordinates.y = event.target.value;
    this.validate();
  }

  onTypeInput = (event) => {
    this.vehicle.type = event.target.value;
  }

  onEnginePowerInput = (event) => {
    this.vehicle.enginePower = event.target.value;
    this.validate();
  }

  onFuelTypeInput = (event) => {
    this.vehicle.fuelType = event.target.value;
  }

  onFuelConsumptionInput = (event) => {
    this.vehicle.fuelConsumption = event.target.value;
    this.validate();
  }

  onCreateButtonClick = () => {
    this.setState({ createButtonState: LOADING });
    Api
      .create(this.vehicle)
      .then(() => this.props.onCreate(this.vehicle))
      .catch(err => console.log(err))
      .finally(() => this.setState({ createButtonState: ENABLED }));
  }

  createInput(onInput) {
    return <input onChange={onInput}></input>;
  }
  
  createTypeSelect() {
    return (
      <select onChange={this.onTypeInput}>
        {TYPES.map(type => <option value={type}>{type}</option>)}
      </select>
    );
  }

  createFuelTypeSelect() {
    return (
      <select onChange={this.onFuelTypeInput}>
        {FUEL_TYPES.map(type => <option value={type}>{type}</option>)}
      </select>
    );
  }

  createCreateButton() {
    const state = this.state.createButtonState;
    const isEnabled = state === ENABLED;
    return (
      <button
        disabled={!isEnabled}
        onClick={this.onCreateButtonClick}
      >
        {state === LOADING ? "Creating.." : "Create"} 
      </button>
    );
  }

  render() {
    return (
      <tr>
        <td></td>
        <td>{this.createInput(this.onNameInput)}</td>
        <td></td>
        <td>{this.createInput(this.onXInput)}</td>
        <td>{this.createInput(this.onYInput)}</td>
        <td>{this.createTypeSelect()}</td>
        <td>{this.createInput(this.onEnginePowerInput)}</td>
        <td>{this.createFuelTypeSelect()}</td>
        <td>{this.createInput(this.onFuelConsumptionInput)}</td>
        <td>{this.createCreateButton()}</td>
        <td></td>
      </tr>
    );
  }
}

export default CreateItemRow;
