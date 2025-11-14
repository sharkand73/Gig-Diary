import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import New from './pages/New';
import List from './pages/List';
import Edit from './pages/Edit';
import Stats from './pages/GigStats';
import ServiceContainer from './services/ServiceContainer';
import './App.css';

function App() {
  useEffect(() => {
    const fetchAppData = async () => {
      console.log('Starting fetchAppData...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      try {
        console.log('Getting gig service...');
        const gigService = ServiceContainer.getGigService();
        console.log('Calling getMappings...');
        const mappings = await gigService.getMappings(controller.signal);
        console.log('Received mappings:', mappings);
        
        sessionStorage.setItem('mappings', JSON.stringify(mappings));
        console.log('Stored in sessionStorage');
        clearTimeout(timeoutId);
      } catch (error) {
        console.error('Failed to fetch mappings:', error);
      }
    };
    
    fetchAppData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<New />} />
          <Route path="new" element={<New />} />
          <Route path="list" element={<List />} />
          <Route path="edit/:id" element={<Edit />} />
          <Route path="stats" element={<Stats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
