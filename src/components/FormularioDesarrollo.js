import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Modal, Button } from "react-bootstrap";

const FormularioDesarrollo = () => {
  const navegar = useNavigate();

  const [state, setState] = useState({
    dia: new Date(),
    hora: dayjs().format("HH:mm"),
    estrategias: JSON.parse(localStorage.getItem("estrategiasDesarrollo")) || [],
    alistamiento: JSON.parse(localStorage.getItem("alistamientoDesarrollo")) || [],
  });

  const [showModal, setShowModal] = useState(false);
  const [campoText, setCampoText] = useState("");
  const [campoType, setCampoType] = useState("");

  useEffect(() => {
    return () => {
      // Cleanup function to run on unmount
      localStorage.setItem("estrategiasDesarrollo", JSON.stringify(state.estrategias));
      localStorage.setItem("alistamientoDesarrollo", JSON.stringify(state.alistamiento));
    };
  }, [state]);

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
    setShowModal(true);
  };

  const handleRemoveCampo = (campo, index) => {
    setState((prevState) => {
      const items = [...prevState[campo]];
      items.splice(index, 1);
      return { ...prevState, [campo]: items };
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formularioDesarrollo = {
      dia: state.dia,
      hora: state.hora,
      estrategias: state.estrategias,
      alistamiento: state.alistamiento,
    };
    localStorage.setItem("formularioDesarrollo", JSON.stringify(formularioDesarrollo));
    return navegar("/finalizacion");
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
                onChange={(event) => handleInputChangeEstrategias(event, index)}
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

        {/* Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Agregar {campoType}</Modal.Title>
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
                onChange={(event) => handleInputChangeAlistamiento(event, index)}
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
        <div className="form-group row">
          <div className="col-sm-12 mb-3"></div>
        </div>
        <div className="mt-3">
          <Link to="/inicio" className="btn btn-secondary mr-2">
            Atras
          </Link>
          <button type="submit" className="btn btn-primary">
            Siguiente
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioDesarrollo;
