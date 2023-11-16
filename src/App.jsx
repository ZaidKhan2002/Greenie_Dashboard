import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import UserDetails from './components/UserDetails';
import Sidebar from './components/Sidebar';
import Account from './components/Account'

function App() {

  return (
    <Router>
      <div className='flex flex-col lg:flex-row'>
        <Sidebar />
        <div className='lg:ml-64 p-4'>
          <Routes>
            <Route path="/" element={<UserDetails />} />
            <Route path="/userdetails" element={<UserDetails />} />
            <Route path='/createaccount' element={<Account />}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App