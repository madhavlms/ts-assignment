import React from 'react';
import { BrowserRouter , Route, Routes , Navigate } from 'react-router-dom';
import './App.css';
import Register from './component/Register/Register';
import TempTracker from './component/TempTracker/TempTracker';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/coda/register" element={<Register/>}/>
        <Route path="/tracker" element={<TempTracker />} />
        <Route path="/" element={<Navigate to="/coda/register"/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/* <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.tsx</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header> */