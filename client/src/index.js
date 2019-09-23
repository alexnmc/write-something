import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import UserProvider from './Context/UserProvider'
import DataProvider from './Context/DataProvider'
import './style.css'



ReactDOM.render(
        
    <UserProvider> 
    <DataProvider>
        <App/>
    </DataProvider> 
    </UserProvider>,    
    
document.getElementById('root'))
