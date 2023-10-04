import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import TokenReceiver from './TokenReceiver';
import YaLog from './YaLog';
import Home from "./home";

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<YaLog />} />
                    <Route path="/tokenreceiver" element={<TokenReceiver />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
