import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import UseStore from './store/useStore';
import UseDevices from './store/deviceStore'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
export const Context =createContext(null)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UseStore(),
        device: new UseDevices(),
    }}>
        <BrowserRouter> <App /></BrowserRouter>
    </Context.Provider>
);

