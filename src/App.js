import React, { Component } from 'react';
import './App.css';
import TreeView from './components/TreeView/TreeView'
import Preview from './components/RightPreview/RightPreview'
class App extends Component {
  render() {
    return (
      <div className="App">
        <nav id="TreeNav">
          <TreeView />
        </nav>
        <div id="Preview">
          <Preview />
        </div>
      </div>
    );
  }
}

export default App;
