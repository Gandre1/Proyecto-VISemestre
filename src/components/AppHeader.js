import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CNavLink,
  CNavItem,
} from '@coreui/react'


const AppHeader = () => {

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink}>
              Plan de Acompañamiento
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
