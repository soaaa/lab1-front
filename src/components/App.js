import './css/App.css';
import React from "react";

import Main from "./Main";
import SearchByName from "./SearchByName";
import AvgFuelConsumption from "./AvgFuelConsumption";
import EnginePowerToCount from "./EnginePowerToCount";
import SearchByType from "./SearchByType";
import SearchByEnginePower from "./SearchByEnginePower";

const BLOCK_MAIN = "MAIN";
const BLOCK_NAME_SUBSEQ = "NAME_SUBSEQ";
const BLOCK_AVG_FUEL_CONS = "AVG_FUEL_CONS";
const BLOCK_ENG_POW_TO_COUNT = "ENG_POW_TO_COUNT";
const BLOCK_SEARCH_BY_TYPE = "SEARCH_BY_TYPE";
const BLOCK_SEARCH_BY_ENGINE_POWER = "SEARCH_BY_ENGINE_POWER"

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { block: BLOCK_MAIN };

    this.onMainTabClick = this.onTabClick.bind(this, null, BLOCK_MAIN);
    this.onSearchByNameTabClick = this.onTabClick.bind(this, null, BLOCK_NAME_SUBSEQ);
    this.onAvgFuelConsTabClick = this.onTabClick.bind(this, null, BLOCK_AVG_FUEL_CONS);
    this.onEngPowToCountTabClick = this.onTabClick.bind(this, null, BLOCK_ENG_POW_TO_COUNT);
    this.onSearchByTypeTabClick = this.onTabClick.bind(this, null, BLOCK_SEARCH_BY_TYPE);
    this.onSearchByEnginePowerTabClick = this.onTabClick.bind(this, null, BLOCK_SEARCH_BY_ENGINE_POWER);

    this.createMainTabClass = this.createTabClass.bind(this, BLOCK_MAIN);
    this.createSearchByNameTabClass = this.createTabClass.bind(this, BLOCK_NAME_SUBSEQ);
    this.createAvgFuelConsTabClass = this.createTabClass.bind(this, BLOCK_AVG_FUEL_CONS);
    this.createEngPowToCountTabClass = this.createTabClass.bind(this, BLOCK_ENG_POW_TO_COUNT);
    this.createSearchByTypeTabClass = this.createTabClass.bind(this, BLOCK_SEARCH_BY_TYPE);
    this.createSearchByEnginePowerTabClass = this.createTabClass.bind(this, BLOCK_SEARCH_BY_ENGINE_POWER);
  }

  createContentBlock() {
    switch (this.state.block) {
      case BLOCK_MAIN: return <Main />;
      case BLOCK_NAME_SUBSEQ: return <SearchByName />;
      case BLOCK_AVG_FUEL_CONS: return <AvgFuelConsumption />;
      case BLOCK_ENG_POW_TO_COUNT: return <EnginePowerToCount />;
      case BLOCK_SEARCH_BY_TYPE: return <SearchByType />;
      case BLOCK_SEARCH_BY_ENGINE_POWER: return <SearchByEnginePower />;
    }
  }

  onTabClick(event, block) {
    this.setState({ block });
  }

  createTabClass(block) {
    var classValue = "tab";
    if (block === this.state.block) classValue += " selected";
    return classValue;
  }

  render() {
    return (
      <div className="App">
        <div className="tabs-sec">
          <div 
            className={this.createMainTabClass()} 
            onClick={this.onMainTabClick}
          >
            Main
          </div>
          <div 
            className={this.createAvgFuelConsTabClass()}
            onClick={this.onAvgFuelConsTabClick}
          >
            Average fuel consumption
          </div>
          <div 
            className={this.createEngPowToCountTabClass()}
            onClick={this.onEngPowToCountTabClick}
          >
            Engine power to count
          </div>
          <div 
            className={this.createSearchByNameTabClass()}
            onClick={this.onSearchByNameTabClick}
          >
            Search by name
          </div>
          <div 
            className={this.createSearchByTypeTabClass()}
            onClick={this.onSearchByTypeTabClick}
          >
            Search by type
          </div>
          <div 
            className={this.createSearchByEnginePowerTabClass()}
            onClick={this.onSearchByEnginePowerTabClick}
          >
            Search by engine power
          </div>
        </div>
        {this.createContentBlock()}
      </div>
    );
  }
}

export default App;
