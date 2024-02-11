import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
function Header() {
  
  let location = useLocation();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <img className='w-100' height='60' width='60' src="https://upload.wikimedia.org/wikipedia/commons/5/50/Bitcoin.png" alt="logo" />
      </a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className={`nav-link ${location.pathname == '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
          <Link className={`nav-link ${location.pathname == '/exchanges' ? 'active' : ''}`} to="/exchanges">Exchanges</Link>
          {/* <Link className="nav-link" to="/coin/:id">CoinDetails</Link> */}
          <Link className={`nav-link ${location.pathname == '/coin' ? 'active' : ''}`} to="/coin">Coin</Link>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header