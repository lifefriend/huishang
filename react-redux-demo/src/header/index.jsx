import React from 'react';
import { connect } from 'react-redux';

import './index.scss'
import { mapStateToProps, mapDispatchToProps } from '../store/index.jsx'

class Head extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    const {text, onChangeText, onButtonClick} = this.props;
    return (
    <div className="tool-wrapper">
      <h1 onClick={onChangeText}> {text} </h1>
      <button onClick={onButtonClick}>click me</button>
    </div>
    )
  }
}

//连接组件
export const Header = connect(mapStateToProps, mapDispatchToProps)(Head)