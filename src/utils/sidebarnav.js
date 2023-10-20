import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilDrop,
  cilPuzzle,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const sidebarnav = [
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    }
  },
  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      }
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default sidebarnav
