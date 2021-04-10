import React from "react";

import ItemRow from "./ItemRow";

import Api from "../api";

class SearchByName extends React.Component {

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
      <div className="content-sec">
        <div className="input-sec">
          <label for="value">Search</label>
          <input id="value" onChange={this.find}/>
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

export default SearchByName;
