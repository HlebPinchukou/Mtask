import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TokenReceiver from './TokenReceiver';
import Home from './Home';
import { TokenProvider } from './TokenContext';
import YaLog from './YaLog';

function App() {
    return (
        <TokenProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<YaLog />} />
                        <Route path="/tokenreceiver" element={<TokenReceiver />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </div>
            </Router>
        </TokenProvider>
    );
}

export default App;

