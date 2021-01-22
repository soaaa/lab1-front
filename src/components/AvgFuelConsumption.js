import "./css/AvgFuelConsumption.css";

import React from "react";

import Api from "../api";

class AvgFuelConsumption extends React.Component {

  constructor(props) {
    super(props);

    this.state = { value: null };
  }

  componentDidMount() {
    Api
      .findAvgFuelConsumption()
      .then(res => {
        if (res.status === 200) {
          this.setState({ value: res.data });
        } else {
          alert(res.data);
        }
      })
      .catch(err => console.log(err));
  }

  getValueOrEmpty() {
    if (this.state.value === null) return;
    return this.state.value;
  }

  render() {
    return (
      <div className="AvgFuelConsumption content-sec">
        <table className="table">
        <thead>
        <tr>
          <th>Average fuel consumption</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.getValueOrEmpty()}</td>
          </tr>
        </tbody>
        </table>
      </div>
    );
  }
}

export default AvgFuelConsumption;
