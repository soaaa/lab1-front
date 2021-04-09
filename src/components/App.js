import './css/App.css';
import React from "react";

import Main from "./Main";
import NameSubsequence from "./NameSubsequence";
import AvgFuelConsumption from "./AvgFuelConsumption";
import EnginePowerToCount from "./EnginePowerToCount";
import SearchByType from "./SearchByType";

const BLOCK_MAIN = "MAIN";
const BLOCK_NAME_SUBSEQ = "NAME_SUBSEQ";
const BLOCK_AVG_FUEL_CONS = "AVG_FUEL_CONS";
const BLOCK_ENG_POW_TO_COUNT = "ENG_POW_TO_COUNT";
const BLOCK_SEARCH_BY_TYPE = "SEARCH_BY_TYPE";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = { block: BLOCK_MAIN };

    this.onMainTabClick = this.onTabClick.bind(this, null, BLOCK_MAIN);
    this.onNameSubseqTabClick = this.onTabClick.bind(this, null, BLOCK_NAME_SUBSEQ);
    this.onAvgFuelConsTabClick = this.onTabClick.bind(this, null, BLOCK_AVG_FUEL_CONS);
    this.onEngPowToCountTabClick = this.onTabClick.bind(this, null, BLOCK_ENG_POW_TO_COUNT);
    this.onSearchByTypeTabClick = this.onTabClick.bind(this, null, BLOCK_SEARCH_BY_TYPE);

    this.createMainTabClass = this.createTabClass.bind(this, BLOCK_MAIN);
    this.createNameSubseqTabClass = this.createTabClass.bind(this, BLOCK_NAME_SUBSEQ);
    this.createAvgFuelConsTabClass = this.createTabClass.bind(this, BLOCK_AVG_FUEL_CONS);
    this.createEngPowToCountTabClass = this.createTabClass.bind(this, BLOCK_ENG_POW_TO_COUNT);
    this.createSearchByTypeTabClass = this.createTabClass.bind(this, BLOCK_SEARCH_BY_TYPE);
  }

  createContentBlock() {
    switch (this.state.block) {
      case BLOCK_MAIN: return <Main />;
      case BLOCK_NAME_SUBSEQ: return <NameSubsequence />;
      case BLOCK_AVG_FUEL_CONS: return <AvgFuelConsumption />;
      case BLOCK_ENG_POW_TO_COUNT: return <EnginePowerToCount />;
      case BLOCK_SEARCH_BY_TYPE: return <SearchByType />;
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
            className={this.createNameSubseqTabClass()}
            onClick={this.onNameSubseqTabClick}
          >
            Search by name subsequence
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
            className={this.createSearchByTypeTabClass()}
            onClick={this.onSearchByTypeTabClick}
          >
            Search by type
          </div>
        </div>
        {this.createContentBlock()}
      </div>
    );
  }
}

export default App;
