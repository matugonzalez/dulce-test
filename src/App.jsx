import { useState } from 'react'
import './App.css'

import BusinessRouter from './components/BusinessRouter';
import HeaderBar from './components/HeaderBar';

function App() {

    return(
        <div className='App'>
            <HeaderBar />
            <BusinessRouter />
        </div> 
    )
}

export default App
