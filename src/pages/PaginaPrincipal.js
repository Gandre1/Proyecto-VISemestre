import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { POST_GET_FORMULARIO } from "../connections/helpers/endpoints";
import CardFormulario from "../components/CardFormulario";
import { Container } from "@mui/material";
import { CContainer } from "@coreui/react";

const PaginaPrincipal = () => {
  const [documentos, setDocumentos] = useState([]);
  const [buscando, setBuscando] = useState(true);

  const obtenerFormularios = async () => {
    try {
      const response = await axios.get(POST_GET_FORMULARIO);
      return response.data;
    } catch (error) {
      console.error("Error al obtener formularios:", error);
      throw error; 
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await obtenerFormularios();
        setDocumentos(data);
      } catch (error) {
      } finally {
        setBuscando(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <center>
        <h1>Página Principal</h1>
        <button>
          <Link to="/inicio">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </button>
      </center>
      {buscando
        ? "Cargando..."
        : documentos.length === 0 && "No hay documentos disponibles"}
      {documentos.map((documento,index) => (
          <CardFormulario key={index} formulario={documento} />
      ))}
    </div>
  );
};

export default PaginaPrincipal;
