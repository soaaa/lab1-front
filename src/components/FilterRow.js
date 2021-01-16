import React from "react";

import { TYPES, FUEL_TYPES, NO_FILTER } from "../types";

class FilterRow extends React.Component {

  constructor(props) {
    super(props);

    this.filters = {
      id: null,
      name: null,
      creation_date: null,
      type: null,
      engine_power: null,
      fuel_type: null,
      fuel_consumption: null,
    };
    this.props.onChanged(this.filters);
  }

  onIdInput = (event) => {
    const value = event.target.value;
    var id;
    if (value.length === 0) id = null;
    else id = parseInt(value);
    this.filters.id = id;
    this.props.onChanged(this.filters);
  }

  onNameInput = (event) => {
    const value = event.target.value;
    var name;
    if (value.length === 0) name = null;
    else name = value;
    this.filters.name = name;
    this.props.onChanged(this.filters);
  }

  onCreationDateInput = (event) => {
    const value = event.target.value;
    var creationDate;
    if (value.length === 0) creationDate = null;
    else creationDate = Date.parse(value);
    this.filters.creation_date = creationDate;
    this.props.onChanged(this.filters);
  }
  
  onTypeInput = (event) => {
    this.filters.type = event.target.value;
    this.props.onChanged(this.filters);
  }

  onEnginePowerInput = (event) => {
    const value = event.target.value;
    var enginePower;
    if (value.length === 0) enginePower = null;
    else enginePower = parseInt(value);
    this.filters.engine_power = enginePower;
    this.props.onChanged(this.filters);
  }

  onFuelTypeInput = (event) => {
    this.filters.fuel_type = event.target.value;
    this.props.onChanged(this.filters);
  }

  onFuelConsumptionInput = (event) => {
    const value = event.target.value;
    var fuelConsumption;
    if (value.length === 0) fuelConsumption = null;
    else fuelConsumption = parseInt(value);
    this.filters.fuel_consumption = fuelConsumption;
    this.props.onChanged(this.filters);
  }

  createTypeSelect() {
    const texts = TYPES.slice();
    texts.unshift("ANY");
    const values = TYPES.slice();
    values.unshift(null);
    return (
      <select onChange={this.onTypeInput}>
        {values.map((value, index) => 
          <option value={value}>{texts[index]}</option>
        )}
      </select>
    );
  }

  createFuelTypeSelect() {
    const texts = FUEL_TYPES.slice();
    texts.unshift("ANY");
    const values = FUEL_TYPES.slice();
    values.unshift(null);
    return (
      <select onChange={this.onFuelTypeInput}>
        {values.map((value, index) => 
          <option value={value}>{texts[index]}</option>
        )}
      </select>
    );
  }

  render() {
    return (
      <tr>
        <td><input onChange={this.onIdInput}></input></td>
        <td><input onChange={this.onNameInput}></input></td>
        <td><input type="date" onChange={this.onCreationDateInput}></input></td>
        <td></td>
        <td></td>
        <td>{this.createTypeSelect()}</td>
        <td><input onChange={this.onEnginePowerInput}></input></td>
        <td>{this.createFuelTypeSelect()}</td>
        <td><input onChange={this.onFuelConsumptionInput}></input></td>
      </tr>
    );
  }
}

export default FilterRow;
