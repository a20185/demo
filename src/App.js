import React, { Component } from 'react';
import './App.css';
import TreeView from './components/TreeView/TreeView'
class App extends Component {
  render() {
    return (
      <div className="App">
        <nav id="TreeNav">
          <TreeView />
        </nav>
      </div>
    );
  }
}

export default App;
