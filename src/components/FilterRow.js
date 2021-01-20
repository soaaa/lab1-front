import React from "react";

import { TYPES, FUEL_TYPES, NO_FILTER } from "../types";

class FilterRow extends React.Component {

  constructor(props) {
    super(props);

    this.filters = {
      id: "",
      name: "",
      creation_date: "",
      type: "",
      engine_power: "",
      fuel_type: "",
      fuel_consumption: "",
    };
    this.props.onChange(this.filters);
  }

  onInput = (prop, event) => {
    this.filters[prop] = event.target.value;
    this.props.onChange(this.filters);
  }

  createInput(prop, type) {
    return <input type={type} onChange={this.onInput.bind(null, prop)} />;
  }

  createSelect(options, prop) {
    const texts = options.slice();
    texts.unshift("ANY");
    const values = options.slice();
    values.unshift("");
    return (
      <select onChange={this.onInput.bind(null, prop)}>
        {values.map((value, index) =>
          <option value={value}>{texts[index]}</option>
        )}
      </select>
    );
  }

  render() {
    return (
      <tr>
        <td>{this.createInput("id")}</td>
        <td>{this.createInput("name")}</td>
        <td>{this.createInput("creation_date", "date")}</td>
        <td></td>
        <td></td>
        <td>{this.createSelect(TYPES, "type")}</td>
        <td>{this.createInput("engine_power")}</td>
        <td>{this.createSelect(FUEL_TYPES, "fuel_type")}</td>
        <td>{this.createInput("fuel_consumption")}</td>
      </tr>
    );
  }
}

export default FilterRow;
