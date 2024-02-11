import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Exchanges from './components/Exchanges'
import CoinDetails from './components/CoinDetails'
import Coin from './components/Coin'
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/exchanges' exact element={<Exchanges />} />
        <Route path='/coin/:id' exact element={<CoinDetails />} />
        <Route path='/coin' exact element={<Coin />} />
      </Routes>
    </Router>
  )
}

export default App