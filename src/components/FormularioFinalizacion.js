import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

class FormularioFinalizacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dia: '',
      hora: '',
      estrategias: [''],
      alistamiento: [''],
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleInputChangeEstrategias = (event, index) => {
    const { value } = event.target;
    const estrategias = [...this.state.estrategias];
    estrategias[index] = value;
    this.setState({ estrategias });
  }

  handleInputChangeAlistamiento = (event, index) => {
    const { value } = event.target;
    const alistamiento = [...this.state.alistamiento];
    alistamiento[index] = value;
    this.setState({ alistamiento });
  }

  handleAddCampo = (campo) => {
    this.setState((prevState) => ({
      [campo]: [...prevState[campo], ''],
    }));
  }

  handleRemoveCampo = (campo, index) => {
    const items = [...this.state[campo]];
    items.splice(index, 1);
    this.setState({ [campo]: items });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const optionsHora = [];
    for (let hour = 6; hour <= 22; hour++) {
      const formattedHour = `${hour.toString().padStart(2, '0')}:00`;
      optionsHora.push(
        <option key={formattedHour} value={formattedHour}>
          {formattedHour}
        </option>
      );
    }

    return (
      <div className="container formulario-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="dia" className="col-sm-2 col-form-label">Día:</label>
            <div className="col-sm-10">
              <select className="form-control" id="dia" name="dia" onChange={this.handleInputChange}>
                <option value="">Selecciona un día</option>
                <option value="lunes">Lunes</option>
                <option value="martes">Martes</option>
                <option value="miércoles">Miércoles</option>
                <option value="jueves">Jueves</option>
                <option value="viernes">Viernes</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="hora" className="col-sm-2 col-form-label">Hora:</label>
            <div className="col-sm-10">
              <select className="form-control" id="hora" name="hora" onChange={this.handleInputChange}>
                <option value="">Selecciona una hora</option>
                {optionsHora}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Estrategias Pedagógicas:</label>
            {this.state.estrategias.map((estrategia, index) => (
              <div className="input-group mb-2" key={`estrategia-${index}`}>
                <input
                  type="text"
                  name="estrategias"
                  value={estrategia}
                  onChange={(event) => this.handleInputChangeEstrategias(event, index)}
                  className="form-control"
                />
                <div className="input-group-append">
                  <button type="button" onClick={() => this.handleRemoveCampo('estrategias', index)} className="btn btn-danger">Eliminar</button>
                  <button type="button" onClick={() => this.handleAddCampo('estrategias')} className="btn btn-primary">Agregar Estrategia</button>
                </div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Alistamiento:</label>
            {this.state.alistamiento.map((alistamiento, index) => (
              <div className="input-group mb-2" key={`alistamiento-${index}`}>
                <input
                  type="text"
                  name="alistamiento"
                  value={alistamiento}
                  onChange={(event) => this.handleInputChangeAlistamiento(event, index)}
                  className="form-control"
                />
                <div className="input-group-append">
                  <button type="button" onClick={() => this.handleRemoveCampo('alistamiento', index)} className="btn btn-danger">Eliminar</button>
                  <button type="button" onClick={() => this.handleAddCampo('alistamiento')} className="btn btn-primary">Agregar Alistamiento</button>
                </div>
              </div>
            ))}
          </div>
          <div className="form-group row">
            <div className="col-sm-12 mb-3">
              <button type="submit" className="btn btn-primary">Enviar</button>
            </div>
          </div>
        </form>
        <div className="mt-3">
          <Link to="/desarrollo" className="btn btn-secondary mr-2">Volver</Link>
          <button className="btn btn-success">Generar PDF</button>
        </div>
      </div>
    );
  }
}

export default FormularioFinalizacion;
