import React from "react";

import ItemRow from "./ItemRow";

import Api from "../api";

class SearchByEnginePower extends React.Component {

  constructor(props) {
    super(props);

    this.state = { vehicles: [] };
  }

  componentDidMount() {
    this.find();
  }

  find = (event) => {
    const from = this.from;
    const to = this.to;
    if (!from || !to) return;
    Api
      .searchByEnginePower(from, to)
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

  onInput(prop, event) {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      this[prop] = value;
      this.find();
    } else {
      this[prop] = null;
    }
  }

  createInput(prop) {
    return <input id={prop} onChange={this.onInput.bind(this, prop)}/>;
  }

  createItemRows() {
    return this.state.vehicles.map(it => <ItemRow vehicle={it}/>);
  }

  render() {
    return (
      <div className="content-sec">
	<div className="input-sec">
	  <label for="from">Engine power from</label>
	  {this.createInput("from")}
	  <label for="to">to</label>
	  {this.createInput("to")}
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

export default SearchByEnginePower;
