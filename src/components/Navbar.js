import React from 'react';
import { Link } from 'react-router-dom';
import '../css/index.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-red"> 
      <div className="container">
        <Link className="navbar-brand" to="/">Plan de Acompañamiento</Link>
        
      </div>
    </nav>
  );
}

export default Navbar;
