import React from "react";

import ItemRow from "./ItemRow";

import Api from "../api";

import { TYPES } from "../types";

class SearchByType extends React.Component {

  constructor(props) {
    super(props);

    this.state = { vehicles: [] };
  }

  componentDidMount() {
    this.find();
  }

  find = (event) => {
    var value = TYPES[0];
    if (event) {
      value = event.target.value;
    }
    Api
      .searchByType(value)
      .then(res => {
	const status = res.status;
        if (status === 200) {
          this.setState({ vehicles: res.data });
        } else if (status === 500) {
          alert("Internal server error");
        }
      })
      .catch(err => console.log(err));
  }

  createTypesSelect() {
    return (
      <select onChange={this.find}>
	{TYPES.map(it => <option value={it}>{it}</option>)}
      </select>
    );
  }

  createItemRows() {
    return this.state.vehicles.map(it => <ItemRow vehicle={it}/>);
  }

  render() {
    return (
      <div className="content-sec">
	<div className="input-sec">
	  <label for="value">Type</label>
	  {this.createTypesSelect()}
	</div>
        <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Creation date</th>
            <th>X</th>
            <th>Y</th>
            <th>Type</th>
            <th>Engine power</th>
            <th>Fuel type</th>
            <th>Fuel consumption</th>
          </tr>
        </thead>
        <tbody>
          {this.createItemRows()}
        </tbody>
        </table>
      </div>
    );
  }
}

export default SearchByType;
