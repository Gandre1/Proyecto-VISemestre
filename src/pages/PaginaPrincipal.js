import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function PaginaPrincipal() {
  return (
    <div>
      <Navbar />
     <center><h1>Página Principal</h1> 
      <button>
        <Link to="/inicio">Crear Plan de Acompañamiento</Link>
      </button></center>
    </div>
  );
}

export default PaginaPrincipal;
