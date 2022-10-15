import React, { Component } from "react";
import Scanner from "../components/scanner/Scanner";
import { Card } from "@nextui-org/react";

class Test extends Component {
  state = {
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    this.setState({ results: [] });
    this.setState({ results: this.state.results.concat([result]) });
  };

  render() {
    return (
      <div>
        <span>Barcode Scanner</span>
        <Card>
          <Scanner onDetected={this._onDetected} />
        </Card>
      </div>
    );
  }
}

export default Test;
