import React, { useState } from 'react'
import {
  CModal,
  CModalFooter,
  CButton,
  CModalHeader,
  CModalTitle,
  CAlert,
  CForm,
} from '@coreui/react'
import api from 'src/api'

function DocFileDelete({ data, open, handleClose, refreshList }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(open)
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.delete(`docfile/${data.docFileId}/delete`)
      refreshList()
      setOpenDeleteModal(false)
      handleClose()
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg('Sem resposta do servidor')
      } else {
        setErrMsg('Registration Failed')
      }
    }
  }

  return (
    <CModal
      alignment="center"
      scrollable
      backdrop="static"
      visible={openDeleteModal}
      onClose={() => {
        setOpenDeleteModal(false)
        handleClose()
      }}
    >
      <CForm onSubmit={handleSubmit}>
        <CModalHeader>
          <CModalTitle>Deseja realmente apagar?</CModalTitle>
        </CModalHeader>
        {errMsg.length > 0 && (
          <CAlert color="danger" style={{ textAlign: 'center' }}>
            {errMsg}
          </CAlert>
        )}
        <CModalFooter className="d-flex justify-content-center">
          <CButton type="submit" color="danger">
            APAGAR
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}
export default DocFileDelete
