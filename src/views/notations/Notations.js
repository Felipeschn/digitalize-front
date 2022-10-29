import React, { useEffect, useRef, useState, useContext } from 'react'
import api from 'src/api'
import {
  CHeaderNav,
  CNavItem,
  CContainer,
  CListGroup,
  CListGroupItem,
  CButton,
} from '@coreui/react'
import { IoMdAdd } from 'react-icons/io'
import { AuthContext } from 'src/context/AuthContext'
import NotationDetails from './NotationDetail'
import CreateNotationModal from './CreateNotationModal'

function Notations() {
  const ref = useRef(null)
  const { currentUserId } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState(false)
  const [userNotations, setUserNotations] = useState([])
  const [expandedRow, setExpandedRow] = useState([])
  const [openNotationModal, setOpenNotationModal] = useState(false)

  useEffect(() => {
    ref.current?.click()
    async function loadData() {
      const { data } = await api.get(`user-docfile/${currentUserId}`)
      setUserNotations(data.filter((e) => e.docType === 'notation'))
    }
    loadData()
  }, [fetchData])

  const refreshList = () => {
    setFetchData(true)
  }

  const handleCloseCreateModal = () => {
    setOpenNotationModal(false)
    refreshList()
  }

  return (
    <CContainer fluid>
      <CHeaderNav className="mb-2">
        <CNavItem>
          <CButton color="success" onClick={() => setOpenNotationModal(!openNotationModal)}>
            <IoMdAdd className="me-1 mb-1" />
            Adicionar anotação
          </CButton>
        </CNavItem>
      </CHeaderNav>
      {openNotationModal && (
        <CreateNotationModal open={openNotationModal} close={handleCloseCreateModal} />
      )}
      {userNotations.map((notation, index) => (
        <>
          <CListGroup>
            <CListGroupItem
              key={notation.docFileId}
              ref={index === 0 ? ref : null}
              component="a"
              style={{ width: '25rem', cursor: 'pointer' }}
              onClick={() => setExpandedRow([notation.docFileId])}
            >
              <div
                key={`${notation.docFileId}-div`}
                className="d-flex w-100 justify-content-between"
              >
                <h5 className="mb-1">{notation.title}</h5>
                <small>x dias atrás</small>
              </div>
              <p className="mb-1">
                {notation.description.length > 27
                  ? `${notation.description.substr(0, 30)} ...`
                  : `${notation.description.substr(0, 30)}`}
              </p>
            </CListGroupItem>
          </CListGroup>
          <NotationDetails
            notation={notation}
            expandedRow={expandedRow}
            refreshList={refreshList}
          />
        </>
      ))}
    </CContainer>
  )
}
export default Notations
