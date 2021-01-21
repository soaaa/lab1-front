import React from "react";

import HeadingsRow from "./HeadingsRow";
import ItemRow from "./ItemRow";
import UpdateItemRow from "./UpdateItemRow";
import CreateItemRow from "./CreateItemRow";

import Api from "../api";

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.filters = {};

    this.state = { 
      vehicles: [],
      updatedItemId: null
    };
  }

  componentDidMount() {
    this.filterVehicles();
  }

  onFilter = (vehicles) => {
    this.setState({ vehicles });
  }

  onFilteringStart = () => {
    this.setState({ vehicles: [] });
  }

  filterVehicles = () => {
    Api
      .filter(this.filters)
      .then(res => this.onFilter(res.data))
      .catch(err => console.log(err))
    this.onFilteringStart();
  }

  onUpdate = () => {
    this.setState({ updatedItemId: null });
    this.filterVehicles();
  }

  createItemRows() {
    return this.state.vehicles.map((vehicle, index) => {
      if (vehicle.id === this.state.updatedItemId) {
        return (
          <UpdateItemRow
            vehicle={vehicle}
            onUpdate={this.onUpdate}
            onCancel={() => this.setState({ updatedItemId: null })}
          />
        );
      } else {
        return (
          <ItemRow
            vehicle={vehicle}
            onUpdateClick={id => this.setState({ updatedItemId: id })}
            onDelete={this.filterVehicles}
          />
        );
      }
    });
  }

  render() {
    return (
      <div className="Main">
        <table>
        <HeadingsRow 
          onFiltersChange={it => this.filters = it}
          onFilteringStart={this.onFilteringStart}
          onFilter={this.onFilter}
        />
        <tbody>
        </tbody>
          <CreateItemRow onCreate={this.filterVehicles}/>
          {this.createItemRows()}
        </table>
      </div>
    );
  }
}

export default Main;
