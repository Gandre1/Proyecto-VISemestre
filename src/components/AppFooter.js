import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="https://github.com/Gandre1" target="_blank" rel="noopener noreferrer">
          Gexon Rodriguez
        </a>
        <span className="ms-1">&copy; 2023.</span>
    </CFooter>
  )
}

export default React.memo(AppFooter)
