import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
export let server = `https://api.coingecko.com/api/v3`

// /coins/markets?vs_currency=pkr&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en