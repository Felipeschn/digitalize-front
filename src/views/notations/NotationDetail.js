import React, { useState } from 'react'
import {
  CContainer,
  CCard,
  CHeader,
  CHeaderNav,
  CNavItem,
  CCardBody,
  CCardText,
  CButton,
  CModalFooter,
  CModal,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { BsPencil } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import api from 'src/api'
import EditNotationModal from './EditNotationModal'

function NotationDetails({ notation, expandedRow, refreshList }) {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const expanded = !!expandedRow.find((docFileId) => docFileId === notation.docFileId)

  const handleClose = () => {
    setOpenEditModal(false)
    setOpenConfirmModal(false)
    refreshList()
  }

  const deleteNotation = async () => {
    await api.delete(`docfile/${notation.docFileId}/delete`)
    handleClose()
  }

  return (
    expanded && (
      <>
        <CContainer
          style={{
            position: 'absolute',
            width: '1225px',
            left: '680px',
            top: '184.5px',
          }}
        >
          <CCard>
            <CHeader position="sticky" className="mb-0 rounded">
              <CHeaderNav>
                <CNavItem>
                  <strong>{notation.title}</strong>
                </CNavItem>
              </CHeaderNav>
              <CHeaderNav>
                <CNavItem className="px-2">
                  <BsPencil
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenEditModal(!openEditModal)}
                    size={22}
                  />
                </CNavItem>
                <CNavItem>
                  <RiDeleteBinLine
                    style={{ cursor: 'pointer' }}
                    onClick={() => setOpenConfirmModal(!openConfirmModal)}
                    size={22}
                  />
                </CNavItem>
              </CHeaderNav>
            </CHeader>
          </CCard>
          <CCard style={{ minHeight: '30pc', overflow: 'auto' }}>
            <CCardBody>
              <CCardText>{notation.description}</CCardText>
            </CCardBody>
          </CCard>
        </CContainer>
        {openConfirmModal && (
          <CModal
            alignment="center"
            scrollable
            backdrop="static"
            size="sm"
            visible={openConfirmModal}
            onClose={() => handleClose()}
          >
            <CModalHeader>
              <CModalTitle>Deseja realmente apagar?</CModalTitle>
            </CModalHeader>
            <CModalFooter className="d-flex justify-content-center">
              <CButton color="danger" onClick={() => deleteNotation()}>
                APAGAR
              </CButton>
            </CModalFooter>
          </CModal>
        )}
        {openEditModal && (
          <EditNotationModal notation={notation} open={openEditModal} close={handleClose} />
        )}
      </>
    )
  )
}

export default NotationDetails
