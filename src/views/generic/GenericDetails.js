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
import FileViewer from 'src/components/FileViewer'
import EditGenericModal from './EditGenericModal'

function GenericDetails({ generic, refreshList }) {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleClose = () => {
    setOpenEditModal(false)
    setOpenDeleteModal(false)
  }

  const deleteNotation = async () => {
    await api.delete(`docfile/${generic.docFileId}/delete`)
    refreshList()
  }

  return (
    <>
      <CContainer
        style={{
          position: 'absolute',
          width: '1225px',
          left: '680px',
          top: '119px',
        }}
      >
        <CCard className="mb-2" style={{ height: '4.65rem' }}>
          <CHeader className="rounded" style={{ height: '4.65rem' }}>
            <CHeaderNav>
              <CNavItem>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    <strong>{generic.title}</strong>
                  </h5>
                </div>
              </CNavItem>
            </CHeaderNav>
            <CHeaderNav>
              <CNavItem className="px-2">
                <BsPencil
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenEditModal(true)}
                  size={22}
                />
              </CNavItem>
              <CNavItem>
                <RiDeleteBinLine
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenDeleteModal(true)}
                  size={22}
                />
              </CNavItem>
            </CHeaderNav>
          </CHeader>
        </CCard>
        <CCard style={{ minHeight: '30pc', overflow: 'auto' }}>
          <CCardBody>
            <CCardText>{generic.description}</CCardText>
            <FileViewer url={generic.bucketUrl} />
          </CCardBody>
        </CCard>
      </CContainer>
      <CModal
        alignment="center"
        scrollable
        backdrop="static"
        size="sm"
        visible={openDeleteModal}
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
      {openEditModal && (
        <EditGenericModal
          open={openEditModal}
          generic={generic}
          handleClose={handleClose}
          refreshList={refreshList}
        />
      )}
    </>
  )
}

export default GenericDetails
