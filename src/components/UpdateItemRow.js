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

  onInput = (prop, event) => {
    this.vehicle[prop] = event.target.value;
    this.validate();
  }

  onCoordInput = (prop, event) => {
    this.vehicle.coordinates[prop] = event.target.value;
    this.validate();
  }

  onOkClick = () => {
    this.setState({ okButtonState: LOADING });
    Api
      .update(this.vehicle)
      .then(() => this.props.onUpdate(this.vehicle))
      .catch(err => console.log(err))
      .finally(() => this.setState({ okButtonState: ENABLED }));
  }

  onCancelClick = () => {
    this.props.onCancel(this.vehicle.id);
  }

  createInput(defaultValue, prop, callback) {
    if (!callback) {
      callback = this.onInput;
    }
    return (
      <input
        defaultValue={defaultValue}
        onChange={callback.bind(null, prop)}
      />
    );
  }

  createSelect(options, defaultValue, prop) {
    return (
      <select 
        defaultValue={defaultValue}
        onChange={this.onInput.bind(null, prop)}
      >
        {options.map(value =>
          <option value={value}>{value}</option>
        )}
      </select>
    );
  }

  createOkButton() {
    const state = this.state.okButtonState;
    return (
      <button
        disabled={state !== ENABLED}
        onClick={this.onOkClick}
      >
        {state === LOADING ? "Updating.." : "OK"}
      </button>
    );
  }

  createCancelButton() {
    return (
      <button 
        disabled={this.state.okButtonState === LOADING}
        onClick={this.onCancelClick}
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
        <td>{this.createInput(vehicle.name, "name")}</td>
        <td>{vehicle.creationDate}</td>
        <td>{this.createInput(coords.x, "x", this.onCoordInput)}</td>
        <td>{this.createInput(coords.y, "y", this.onCoordInput)}</td>
        <td>{this.createSelect(TYPES, vehicle.type, "type")}</td>
        <td>{this.createInput(vehicle.enginePower, "enginePower")}</td>
        <td>{this.createSelect(FUEL_TYPES, vehicle.fuelType, "fuelType")}</td>
        <td>{this.createInput(vehicle.fuelConsumption, "fuelConsumption")}</td>
        <td>{this.createOkButton()}</td>
        <td>{this.createCancelButton()}</td>
      </tr>
    );
  }
}

export default UpdateItemRow;
