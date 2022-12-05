import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CContainer, CHeader, CHeaderNav, CHeaderToggler } from '@coreui/react'
import { AuthContext } from 'src/context/AuthContext'
import { MdMenuOpen, MdMenu } from 'react-icons/md'

function AppHeader() {
  const { handleLogout } = useContext(AuthContext)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CHeader position="sticky" className="mb-2">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          {sidebarShow ? (
            <MdMenuOpen size="35px" style={{ paddingBottom: '5px' }} />
          ) : (
            <MdMenu size="30px" style={{ paddingBottom: '5px' }} />
          )}
          &nbsp;Menu
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex me-auto" />
        <CHeaderNav
          style={{ cursor: 'pointer', fontSize: '18px' }}
          onClick={handleLogout}
          className="ms-3"
        >
          <strong>Sair</strong>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
