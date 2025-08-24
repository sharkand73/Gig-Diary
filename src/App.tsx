import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import New from './pages/New';
import List from './pages/List';
import Edit from './pages/Edit';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<New />} />
          <Route path="new" element={<New />} />
          <Route path="list" element={<List />} />
          <Route path="edit" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
