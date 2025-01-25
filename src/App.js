import React from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <div className="app-container">
            <h1 className="text-3xl font-bold text-center my-4">User Management Dashboard</h1>
            <Dashboard />
        </div>
    );
};

export default App;