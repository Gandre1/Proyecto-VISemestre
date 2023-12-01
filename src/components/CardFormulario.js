import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import {
  POST_GET_FORMULARIO_PDF,
  POST_DELETE_FORMULARIO,
} from "../connections/helpers/endpoints";

const CardFormulario = ({ formulario, callback }) => {
  const [showModal, setShowModal] = useState(false);

  const descargarPdf = async (id, tipo) => {
    try {
      const response = await axios.get(`${POST_GET_FORMULARIO_PDF}${id}`, {
        responseType: "blob",
        params: { tipo },
      });

      const url = URL.createObjectURL(response.data);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  const eliminarDocumento = async () => {
    try {
      await axios.delete(
        `${POST_DELETE_FORMULARIO}${formulario.formularioInicio.formulario.id_relacion}`
      );
      if (callback && typeof callback === "function") {
        callback();
      }
      handleClose();

      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
      handleClose();
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="container form-container">
      <h5 className="text-center mb-3">
        Plan de Acompañamiento{" "}
        {formulario.formularioInicio.formulario.id_relacion}
      </h5>
      <div className="d-flex justify-content-end">
        <Button
          type="button"
          onClick={handleShow}
          className="btn btn-danger"
        >
          Eliminar
        </Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            descargarPdf(
              formulario.formularioInicio.formulario.id_relacion,
              formulario.tipo
            );
          }}
          className="btn btn-primary ml-2"
        >
          Descargar
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar este formulario?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={eliminarDocumento}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CardFormulario;
