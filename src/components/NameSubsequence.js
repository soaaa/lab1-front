import "./css/NameSubsequence.css";

import React from "react";

import ItemRow from "./ItemRow";

import Api from "../api";

class NameSubsequence extends React.Component {

  constructor(props) {
    super(props);

    this.state = { vehicles: [] };
  }

  componentDidMount() {
    this.find();
  }

  find = (event) => {
    var value = "";
    if (event) {
      value = event.target.value;
    }
    Api
      .filterByNameSubsequence(value)
      .then(res => {
        if (res.status === 200) {
          this.setState({ vehicles: res.data });
        } else {
          alert(res.data);
        }
      })
      .catch(err => console.log(err));
  }

  createItemRows() {
    return this.state.vehicles.map(it => <ItemRow vehicle={it}/>);
  }

  render() {
    return (
      <div className="NameSubsequence content-sec">
        <div className="input-sec">
          <label for="value">Search</label>
          <input id="value" onChange={this.find}/>
        </div>
        <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Creation date</td>
            <td>X</td>
            <td>Y</td>
            <td>Type</td>
            <td>Engine power</td>
            <td>Fuel type</td>
            <td>Fuel consumption</td>
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

export default NameSubsequence;
