import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'

import { store, mapStateToProps, mapDispatchToProps } from './store/index.jsx'
import { MyMap } from './map/index.jsx'
import { Header } from './header/index.jsx'

import './main.scss'

class Index extends React.Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <MyMap {...this.props}/>
          <Switch>             
            <Route path="/home" component={ Header }/>       
          </Switch>
        </div>
      </Router> 
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