import React from "react";

import { ENABLED, LOADING } from "../button-states";

import Api from "../api";

class ItemRow extends React.Component {

  constructor(props) {
    super(props);

    this.buttonsEnabled = this.props.onDelete !== undefined;
    this.id = this.props.vehicle.id;

    this.state = { deleteButtonState: ENABLED };
  }

  onUpdateButtonClick = () => {
    this.props.onUpdateClick(this.id);
  }

  onDeleteButtonClick = () => {
    this.setState({ deleteButtonState: LOADING });
    Api
      .delete(this.id)
      .then(res => {
        if (res.status === 200) {
          this.props.onDelete();
        } else {
          alert(res.data);
        }
      })
      .catch(err => console.log(err))
      .finally(() => this.setState({ deleteButtonState: ENABLED }));
  }

  createUpdateButtonColumn() {
    if (!this.buttonsEnabled) return;
    return (
      <td>
        <button 
          className="btn btn-primary"
          disabled={this.state.deleteButtonState === LOADING} 
          onClick={this.onUpdateButtonClick}
        >
          Edit 
        </button>
      </td>
    );
  }

  createDeleteButtonColumn() {
    if (!this.buttonsEnabled) return;
    const state = this.state.deleteButtonState;
    return (
      <td>
        <button
          className="btn btn-danger"
          disabled={state === LOADING}
          onClick={this.onDeleteButtonClick}
        >
          {state === LOADING ? "Deleting.." : "Delete"}
        </button>
      </td>
    );
  }

  render() {
    const vehicle = this.props.vehicle;
    const coords = vehicle.coordinates;
    return (
      <tr>
        <td>{vehicle.id}</td>
        <td className="name">{vehicle.name}</td>
        <td>{vehicle.creationDate}</td>
        <td>{coords.x}</td>
        <td>{coords.y}</td>
        <td>{vehicle.type}</td>
        <td>{vehicle.enginePower}</td>
        <td>{vehicle.fuelType}</td>
        <td>{vehicle.fuelConsumption}</td>
        {this.createUpdateButtonColumn()}
        {this.createDeleteButtonColumn()}
      </tr>
    );
  }
}

export default ItemRow;
