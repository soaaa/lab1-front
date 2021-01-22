import "./css/EnginePowerToCount.css";

import React from "react";

import Api from "../api";

class EnginePowerToCount extends React.Component {

  constructor(props) {
    super(props);

    this.state = { values: [] };
  }

  componentDidMount() {
    Api
      .findEnginePowerToCount()
      .then(res => {
        if (res.status === 200) {
          this.setState({ values: JSON.parse(res.data) });
        } else {
          alert(res.data);
        }
      })
      .catch(err => console.log(err));
  }

  createRows() {
    return this.state.values.map(it => {
      const [ enginePower, count ] = it;
      return (
        <tr>
          <td>{enginePower}</td>
          <td>{count}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="EnginePowerToCount content-sec">
        <table className="table">
        <thead>
          <tr>
            <th>Engine power</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {this.createRows()}
        </tbody>
        </table>
      </div>
    );
  }
}

export default EnginePowerToCount;
