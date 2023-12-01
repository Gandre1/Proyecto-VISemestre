import React from "react";
import FormularioInicio from "../components/FormularioInicio";
import { useState } from "react";
import { useEffect } from "react";
import { POST_GET_FORMULARIO } from "../connections/helpers/endpoints";
import axios from "axios";

function PaginaInicio() {
 
  return (
    <div>
      <center>
        <h1>Inicio</h1>
      </center>
      <FormularioInicio />
    </div>
  );
}

export default PaginaInicio;
