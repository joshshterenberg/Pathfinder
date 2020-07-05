import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

//Functions only to point to external app so we don't have to mess with the built in stuff
function App() {
  return (
    <div className="App">
        <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
