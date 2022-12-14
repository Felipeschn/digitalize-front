import React, { useState } from 'react'
import {
  CContainer,
  CCard,
  CHeader,
  CHeaderNav,
  CNavItem,
  CCardBody,
  CCardText,
} from '@coreui/react'
import { BsPencil } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'
import FileViewer from 'src/components/FileViewer'
import { DocFileEdit, DocFileDelete } from 'src/components/index'

function DocFileDetails({ data, refreshList }) {
  const [openEditModal, setOpenEditModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)

  const handleClose = () => {
    setOpenEditModal(false)
    setOpenDeleteModal(false)
  }

  return (
    <>
      <CContainer>
        <CCard className="mb-2" style={{ height: '4.65rem' }}>
          <CHeader className="rounded" style={{ height: '4.65rem' }}>
            <CHeaderNav>
              <CNavItem>
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    <strong>{data?.title}</strong>
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
            <CCardText>{data?.description}</CCardText>
            {data.bucketUrl && <FileViewer url={data.bucketUrl} />}
          </CCardBody>
        </CCard>
      </CContainer>
      {openEditModal && (
        <DocFileEdit
          open={openEditModal}
          data={data}
          handleClose={handleClose}
          refreshList={refreshList}
        />
      )}
      {openDeleteModal && (
        <DocFileDelete
          open={openDeleteModal}
          data={data}
          handleClose={handleClose}
          refreshList={refreshList}
        />
      )}
    </>
  )
}

export default DocFileDetails
