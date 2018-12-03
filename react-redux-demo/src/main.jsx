import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';

import { store, mapStateToProps, mapDispatchToProps } from './store/index.jsx'
import { MyMap } from './map/index.jsx'

import './main.scss'

class Index extends React.Component {
  render() {
    const {text, onChangeText, onButtonClick} = this.props;
    return (
      <div className="wrapper">
        <div className="tool-wrapper">
          <h1 onClick={onChangeText}> {text} </h1>
          <button onClick={onButtonClick}>click me</button>
        </div>         
        <MyMap {...this.props}/>
      </div>
    );
  }
}
//连接组件
const App = connect(mapStateToProps, mapDispatchToProps)(Index)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);