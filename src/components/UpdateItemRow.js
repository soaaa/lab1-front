import React from "react";

import { ENABLED, DISABLED, LOADING } from "../button-states";
import { TYPES, FUEL_TYPES } from "../types";

import Api from "../api";

class UpdateItemRow extends React.Component {

  constructor(props) {
    super(props);

    this.vehicle = props.vehicle;

    this.state = { okButtonState: ENABLED };
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
    const okButtonState = this.isValid() ? ENABLED : DISABLED;
    this.setState({ okButtonState });
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

  onOkButtonClick = () => {
    this.setState({ okButtonState: LOADING });
    Api
      .update(this.vehicle)
      .then(() => this.props.onUpdate(this.vehicle))
      .catch(err => console.log(err))
      .finally(() => this.setState({ okButtonState: ENABLED }));
  }

  onCancelButtonClick = () => {
    this.props.onCancelClick(this.vehicle.id);
  }

  createInput(value, onInput) {
    return <input value={value} onChange={onInput}></input>;
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

  createOkButton() {
    const state = this.state.okButtonState;
    const isEnabled = state === ENABLED;
    return (
      <button
        disabled={!isEnabled}
        onClick={this.onOkButtonClick}
      >
        {state === LOADING ? "Updating.." : "OK"} 
      </button>
    );
  }

  createCancelButton() {
    const state = this.state.okButtonState;
    return (
      <button
        disabled={state === LOADING}
        onClick={this.onCancelButtonClick}
      >
        Cancel
      </button>
    );
  }

  render() {
    const vehicle = this.vehicle;
    const coords = vehicle.coordinates;
    return (
      <tr>
        <td>{vehicle.id}</td>
        <td>{this.createInput(vehicle.name, this.onNameInput)}</td>
        <td>{vehicle.creationDate}</td>
        <td>{this.createInput(coords.x, this.onXInput)}</td>
        <td>{this.createInput(coords.y, this.onYInput)}</td>
        <td>{this.createTypeSelect()}</td>
        <td>{this.createInput(vehicle.enginePower, this.onEnginePowerInput)}</td>
        <td>{this.createFuelTypeSelect()}</td>
        <td>{this.createInput(vehicle.fuelConsumption, this.onFuelConsumptionInput)}</td>
        <td>{this.createOkButton()}</td>
        <td>{this.createCancelButton()}</td>
      </tr>
    );
  }
}

export default UpdateItemRow;
