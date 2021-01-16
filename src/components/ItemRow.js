import React from "react";

import { ENABLED, LOADING } from "../button-states";

import Api from "../api";

class ItemRow extends React.Component {

  constructor(props) {
    super(props);

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
      .then(() => this.props.onDelete(this.id))
      .catch(err => console.log(err))
      .finally(() => this.setState({ deleteButtonState: ENABLED }));
  }

  createUpdateButton() {
    return (
      <button 
        disabled={this.state.deleteButtonState === LOADING} 
        onClick={this.onUpdateButtonClick}
      >
        Update
      </button>
    );
  }

  createDeleteButton() {
    const state = this.state.deleteButtonState;
    return (
      <button
        disabled={state === LOADING}
        onClick={this.onDeleteButtonClick}
      >
        {state === LOADING ? "Deleting.." : "Delete"}
      </button>
    );
  }

  render() {
    const vehicle = this.props.vehicle;
    const coords = vehicle.coordinates;
    return (
      <tr>
        <td>{vehicle.id}</td>
        <td>{vehicle.name}</td>
        <td>{vehicle.creationDate}</td>
        <td>{coords.x}</td>
        <td>{coords.y}</td>
        <td>{vehicle.type}</td>
        <td>{vehicle.enginePower}</td>
        <td>{vehicle.fuelType}</td>
        <td>{vehicle.fuelConsumption}</td>
        <td>{this.createUpdateButton()}</td>
        <td>{this.createDeleteButton()}</td>
      </tr>
    );
  }
}

export default ItemRow;
