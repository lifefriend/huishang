import React from "react";
import ReactDOM from "react-dom";

import './css/index.scss';

class Index extends React.Component {
  render() {
    return (
      <div>Hello React!!</div>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));