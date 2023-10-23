import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'; 

class FormularioFinalizacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dia: new Date(),
      hora: dayjs().format('HH:mm'), 
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

    return (
      <div className="container form-container">
        <form onSubmit={this.handleSubmit}>
        <div className="form-group row">
            <label htmlFor="dia" className="col-sm-2 col-form-label">Día:</label>
            <div className="col-sm-10">
              <DatePicker
                selected={this.state.dia}
                onChange={date => this.setState({ dia: date })}
                dateFormat="dd/MM/yyyy"
              />
            </div>
        </div>
          <div className="form-group row">
            <label htmlFor="hora" className="col-sm-2 col-form-label">Horario:</label>
            <div className="col-sm-2 col-form-label ">
            <input
                  type="time"
                  name="hora"
                  value={this.state.hora}
                  onChange={(e) => this.setState({ hora: e.target.value })}
                  className="form-control"
                  placeholder="HH:mm"
                />
            </div>
          </div>
          <div className="form-group">
            <label>Estrategias Pedagógicas:</label>
            <button type="button" onClick={() => this.handleAddCampo('estrategias')} className="btn btn-primary">Agregar Estrategia</button>
            {this.state.estrategias.map((estrategia, index) => (
              <div className="input-group mb-2 col-sm-2 col-form-label" key={`estrategia-${index}`}>
                <input
                  type="text"
                  name="estrategias"
                  value={estrategia}
                  onChange={(event) => this.handleInputChangeEstrategias(event, index)}
                  className="form-control"
                />
                <div className="input-group-append">
                  <button type="button" onClick={() => this.handleRemoveCampo('estrategias', index)} className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Alistamiento:</label>
            <button type="button" onClick={() => this.handleAddCampo('alistamiento')} className="btn btn-primary">Agregar Alistamiento</button>
            {this.state.alistamiento.map((alistamiento, index) => (
              <div className="input-group mb-2 col-sm-2 col-form-label" key={`alistamiento-${index}`}>
                <input
                  type="text"
                  name="alistamiento"
                  value={alistamiento}
                  onChange={(event) => this.handleInputChangeAlistamiento(event, index)}
                  className="form-control"
                />
                <div className="input-group-append">
                  <button type="button" onClick={() => this.handleRemoveCampo('alistamiento', index)} className="btn btn-danger">Eliminar</button>
                </div>
              </div>
            ))}
          </div>
          <div className="form-group row">
            <div className="col-sm-12 mb-3">
            </div>
          </div>
        </form>
        <div className="mt-3">
          <Link to="/desarrollo" className="btn btn-secondary mr-2">Atras</Link>
          <button type="submit" className="btn btn-success">Enviar</button>
        </div>
      </div>
    );
  }
}

export default FormularioFinalizacion;
