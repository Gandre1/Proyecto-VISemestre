import PaginaFinalizacion from '../pages/PaginaFinalizacion'
import PaginaInicio from '../pages/PaginaInicio'
import PaginaDesarrollo from '../pages/PaginaDesarrollo'


const routes = [
  { path: '/', exact: true, name: 'Home'},
  { path: '/Inicio', name: 'PaginaIncio', element: PaginaInicio },
  { path: '/Desarrollo', name: 'PaginaDesarrollo', element: PaginaDesarrollo},
  { path: '/Finalizacion', name: 'PaginaFinalizacion', element: PaginaFinalizacion }
]

export default routes
