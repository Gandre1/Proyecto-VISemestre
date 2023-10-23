import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function PaginaPrincipal() {
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
    </div>
  );
}

export default PaginaPrincipal;
