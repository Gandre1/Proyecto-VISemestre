import React from 'react';
import { Link } from 'react-router-dom';

function Navegacion() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
      </ul>
    </nav>
  );
}

export { Navegacion };
