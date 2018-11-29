import React from 'react';
import ReactDOM from 'react-dom';

import { MyMap } from './map/index.jsx'

import './main.scss'

class Index extends React.Component {
  render() {
    return (
      <MyMap/>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));