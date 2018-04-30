import React, { Component } from 'react';
import './App.css';
import './styles/css/styles.css';
import './assets/style/styles.scss';

import {Shell} from "./containers/shell/shell";

class App extends Component {
  render() {
    return (
        <Shell></Shell>
    );
  }
}

export default App;
