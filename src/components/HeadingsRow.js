import "./css/HeadingsRow.css";

import React from "react";

import Api from "../api";

import OrderButton from "./OrderButton";

import { TYPES, FUEL_TYPES } from "../types";
import { ENABLED, DISABLED, LOADING } from "../button-states";
import { NONE } from "../orders";

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../defaults";

class HeadingsRow extends React.Component {

  constructor(props) {
    super(props);

    this.filters = {
      columns: {
        id: "",
        name: "",
        creation_date: "",
        type: "",
        engine_power: "",
        fuel_type: "",
        fuel_consumption: ""
      },
      orders: [],
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE 
    };
    this.props.onFiltersChange(this.filters);

    this.state = { filterButtonState: ENABLED };
  }

  isNumberValid(value) {
    return value.length === 0 || !isNaN(value);
  }

  isValid() {
    const columns = this.filters.columns;
    if (!this.isNumberValid(columns.id)) return false;
    if (!this.isNumberValid(columns.engine_power)) return false;
    if (!this.isNumberValid(columns.fuel_consumption)) return false;
    const page = this.filters.page;
    if (!this.isNumberValid(page) || page < 1) return false;
    const pageSize = this.filters.pageSize;
    if (!this.isNumberValid(pageSize) || pageSize < 1) return false;
    return true;
  }

  validate() {
    this.setState({
      filterButtonState: this.isValid() ? ENABLED : DISABLED
    });
  }

  onInput = (prop, event) => {
    this.filters[prop] = event.target.value;
    this.props.onFiltersChange(this.filters);
    this.validate();
  }

  onInputColumn = (prop, event) => {
    this.filters.columns[prop] = event.target.value;
    this.props.onFiltersChange(this.filters);
    this.validate();
  }

  filter = () => {
    Api
      .filter(this.filters)
      .then(res => {
        if (res.status === 200) {
          this.props.onFilter(res.data);
        } else {
          alert(res.data);
        }
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ filterButtonState: ENABLED }));
    this.setState({ filterButtonState: LOADING });
  }

  onOrderChange(column, order) {
    const newOrders = this.filters.orders.filter(it => it.column !== column);
    if (order !== NONE) {
      newOrders.unshift({ column, order });
    }
    this.filters.orders = newOrders;
    this.props.onFiltersChange(this.filters);
    this.filter();
  }

  createInput(prop, defaultValue, type, callback) {
    const className = prop === "name" ? "text"
      : type === "date" ? "date"
      : "number";
    if (!callback) {
      callback = this.onInputColumn;
    }
    return (
      <input 
        className={className}
        defaultValue={defaultValue}
        type={type} 
        onChange={callback.bind(null, prop)} 
      />
    );
  }

  createSelect(options, prop) {
    const texts = options.slice();
    texts.unshift("ANY");
    const values = options.slice();
    values.unshift("");
    return (
      <select onChange={this.onInputColumn.bind(null, prop)}>
        {values.map((value, index) =>
          <option value={value}>{texts[index]}</option>
        )}
      </select>
    );
  }

  createFilterButton() {
    const state = this.state.filterButtonState;
    return (
      <button
        className="btn btn-primary"
        disabled={state !== ENABLED}
        onClick={this.filter}
      >
        {state === LOADING ? "Filtering.." : "Filter"}
      </button>
    );
  }

  createOrderButton(column) {
    return <OrderButton onChange={this.onOrderChange.bind(this, column)}/>;
  }

  render() {
    return (
      <thead className="HeadingsRow">
      <tr className="filter-row">
        <td>Page</td>
        <td>{this.createInput("page", DEFAULT_PAGE, null, this.onInput)}</td>
        <td>Page size</td>
        <td>{this.createInput("pageSize", DEFAULT_PAGE_SIZE, null, this.onInput)}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td className="button-col"></td>
        <td className="button-col"></td>
      </tr>
      <tr className="filter-row">
        <td>{this.createInput("id")}</td>
        <td>{this.createInput("name")}</td>
        <td>{this.createInput("creation_date", null, "date")}</td>
        <td></td>
        <td></td>
        <td>{this.createSelect(TYPES, "type")}</td>
        <td>{this.createInput("engine_power")}</td>
        <td>{this.createSelect(FUEL_TYPES, "fuel_type")}</td>
        <td>{this.createInput("fuel_consumption")}</td>
        <td>{this.createFilterButton()}</td>
        <td></td>
      </tr>
      <tr>
        <th>ID {this.createOrderButton("id")}</th>
        <th>Name {this.createOrderButton("name")}</th>
        <th>Creation date {this.createOrderButton("creation_date")}</th>
        <th>X</th>
        <th>Y</th>
        <th>Type {this.createOrderButton("type")}</th>
        <th>Engine power {this.createOrderButton("engine_power")}</th>
        <th>Fuel type {this.createOrderButton("fuel_type")}</th>
        <th>Fuel consumption {this.createOrderButton("fuel_consumption")}</th>
        <th></th>
        <th></th>
      </tr>
      </thead>
    );
  }
}

export default HeadingsRow;
