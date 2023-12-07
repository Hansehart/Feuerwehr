import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './pages/loading.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </Router>
  );
}

export default App;
