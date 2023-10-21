import PaginaFinalizacion from '../pages/PaginaFinalizacion'
import PaginaInicio from '../pages/PaginaInicio'
import PaginaDesarrollo from '../pages/PaginaDesarrollo'
import PaginaPrincipal from '../pages/PaginaPrincipal'

const routes = [
  { path: '/', name: 'PaginaIncio', element: PaginaPrincipal},
  { path: '/Inicio', name: 'PaginaIncio', element: PaginaInicio },
  { path: '/Desarrollo', name: 'PaginaDesarrollo', element: PaginaDesarrollo},
  { path: '/Finalizacion', name: 'PaginaFinalizacion', element: PaginaFinalizacion }
]

export default routes
