import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import axios from "axios";
import { POST_CREAR_FORMULARIO } from "../connections/helpers/endpoints";
import { Modal, Button } from "react-bootstrap";

const FormularioFinalizacion = () => {
  const navegar = useNavigate();

  const [state, setState] = useState({
    dia: new Date(),
    hora: dayjs().format("HH:mm"),
    estrategias: JSON.parse(localStorage.getItem("estrategiasFinalizacion")) || [],
    alistamiento: JSON.parse(localStorage.getItem("alistamientoFinalizacion")) || [],
  });

  const [showEstrategiasModal, setShowEstrategiasModal] = useState(false);
  const [showAlistamientoModal, setShowAlistamientoModal] = useState(false);
  const [campoText, setCampoText] = useState("");
  const [campoType, setCampoType] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleInputChangeEstrategias = (event, index) => {
    const { value } = event.target;
    setState((prevState) => {
      const estrategias = [...prevState.estrategias];
      estrategias[index] = value;
      return { ...prevState, estrategias };
    });
  };

  const handleInputChangeAlistamiento = (event, index) => {
    const { value } = event.target;
    setState((prevState) => {
      const alistamiento = [...prevState.alistamiento];
      alistamiento[index] = value;
      return { ...prevState, alistamiento };
    });
  };

  const handleAddCampo = (campoType) => {
    setCampoType(campoType);
    if (campoType === "estrategias") {
      setShowEstrategiasModal(true);
    } else if (campoType === "alistamiento") {
      setShowAlistamientoModal(true);
    }
  };

  const handleRemoveCampo = (campo, index) => {
    setState((prevState) => {
      const items = [...prevState[campo]];
      items.splice(index, 1);
      return { ...prevState, [campo]: items };
    });
  };

  const handleModalClose = () => {
    if (campoType === "estrategias") {
      setShowEstrategiasModal(false);
    } else if (campoType === "alistamiento") {
      setShowAlistamientoModal(false);
    }
    setCampoText("");
    setCampoType("");
  };

  const handleModalSave = () => {
    setState((prevState) => ({
      ...prevState,
      [campoType]: [...prevState[campoType], campoText],
    }));
    handleModalClose();
  };

  useEffect(() => {
    // Guardar en localStorage al desmontar el componente
    return () => {
      localStorage.setItem("estrategiasFinalizacion", JSON.stringify(state.estrategias));
      localStorage.setItem("alistamientoFinalizacion", JSON.stringify(state.alistamiento));
      // Limpiar solo los datos de FormularioFinalizacion
      localStorage.removeItem("formularioFinalizacion");
    };
  }, [state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formularioFinalizacion = {
      dia: state.dia,
      hora: state.hora,
      estrategias: state.estrategias,
      alistamiento: state.alistamiento,
    };
    localStorage.setItem("formularioFinalizacion", JSON.stringify(formularioFinalizacion));

    const formulario = {
      formularioInicio: JSON.parse(localStorage.getItem("formularioInicio")),
      formularioDesarrollo: JSON.parse(localStorage.getItem("formularioDesarrollo")),
      formularioFinalizacion: formularioFinalizacion,
    };
    console.log(formulario);

    axios.post(POST_CREAR_FORMULARIO, formulario)
      .then(response => console.log(response))
      .catch(err => console.error(err));

    localStorage.clear();

    return navegar("/");
  };

  return (
    <div className="container form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group row">
          <label htmlFor="dia" className="col-sm-2 col-form-label">
            Día:  
          </label>
          <div className="col-sm-10">
            <DatePicker
              selected={state.dia}
              onChange={(date) => setState((prevState) => ({ ...prevState, dia: date }))}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="hora" className="col-sm-2 col-form-label">
            Horario:
          </label>
          <div className="col-sm-2 col-form-label ">
            <input
              type="time"
              name="hora"
              value={state.hora}
              onChange={(e) => setState((prevState) => ({ ...prevState, hora: e.target.value }))}
              className="form-control"
              placeholder="HH:mm"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Estrategias Pedagógicas:</label>
          <br></br>
          <button
            type="button"
            onClick={() => handleAddCampo("estrategias")}
            className="btn btn-primary"
          >
            Agregar Estrategia
          </button>
          {state.estrategias.map((estrategia, index) => (
            <div
              className="input-group mb-2 col-sm-2 col-form-label"
              key={`estrategia-${index}`}
            >
              <input
                type="text"
                name="estrategias"
                value={estrategia}
                readOnly
                className="form-control"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  onClick={() => handleRemoveCampo("estrategias", index)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para Estrategias */}
        <Modal show={showEstrategiasModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Estrategia</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              value={campoText}
              onChange={(e) => setCampoText(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="form-group">
          <label>Alistamiento:</label>
          <br></br>
          <button
            type="button"
            onClick={() => handleAddCampo("alistamiento")}
            className="btn btn-primary"
          >
            Agregar Alistamiento
          </button>
          {state.alistamiento.map((alistamiento, index) => (
            <div
              className="input-group mb-2 col-sm-2 col-form-label"
              key={`alistamiento-${index}`}
            >
              <input
                type="text"
                name="alistamiento"
                value={alistamiento}
                readOnly
                className="form-control"
              />
              <div className="input-group-append">
                <button
                  type="button"
                  onClick={() => handleRemoveCampo("alistamiento", index)}
                  className="btn btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal para Alistamiento */}
        <Modal show={showAlistamientoModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Alistamiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <textarea
              value={campoText}
              onChange={(e) => setCampoText(e.target.value)}
              className="form-control"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              Guardar
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="form-group row">
          <div className="col-sm-12 mb-3"></div>
        </div>
        <div className="mt-3">
          <Link to="/desarrollo" className="btn btn-secondary mr-2">
            Atras
          </Link>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioFinalizacion;
