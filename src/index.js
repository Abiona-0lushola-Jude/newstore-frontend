import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import UserContextProvider from './Context/userContext';
import SearchContextProvider from './Context/searchContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <UserContextProvider>
            <SearchContextProvider>
               <App /> 
            </SearchContextProvider>
        </UserContextProvider>
    </BrowserRouter>
    
);

