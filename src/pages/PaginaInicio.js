import React from 'react';
import FormularioInicio from '../components/FormularioInicio';
import Navbar from '../components/Navbar';

function PaginaInicio() {
  return (
    <div>
      <Navbar />
      <center><h1>Inicio</h1></center>
      <FormularioInicio />
    </div>
  );
}

export default PaginaInicio;
