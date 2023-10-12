import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PaginaPrincipal from '../pages/PaginaPrincipal';
import PaginaInicio from '../pages/PaginaInicio';
import PaginaDesarrollo from '../pages/PaginaDesarrollo';
import PaginaFinalizacion from '../pages/PaginaFinalizacion';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/inicio">
          <PaginaInicio />
        </Route>
        <Route path="/desarrollo">
          <PaginaDesarrollo />
        </Route>
        <Route path="/finalizacion">
          <PaginaFinalizacion />
        </Route>
        <Route path="/">
          <PaginaPrincipal />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
