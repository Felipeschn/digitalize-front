import React, { useEffect, useState, useContext } from 'react'
import api from 'src/api'
import { CHeaderNav, CNavItem, CContainer, CButton, CSpinner } from '@coreui/react'
import { IoMdAdd } from 'react-icons/io'
import { AuthContext } from 'src/context/AuthContext'

import { DocFileList, DocFileCreate } from 'src/components/index'

function Receipts() {
  const { currentUserId } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState(false)
  const [userDuplicates, setUserDuplicates] = useState([])

  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const { data } = await api.get(`user-docfile/${currentUserId}`, {
        params: { docType: 'receipt' },
      })
      setUserDuplicates(data)
    }
    loadData()
    setIsLoading(false)
  }, [fetchData])

  const refreshList = () => {
    setFetchData(!fetchData)
  }

  const handleClose = () => {
    setOpenCreateModal(false)
  }

  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '25pc',
          }}
        >
          <CSpinner />
        </div>
      ) : (
        <CContainer fluid>
          <CHeaderNav className="mb-2">
            <CNavItem>
              <CButton color="primary" onClick={() => setOpenCreateModal(true)}>
                <IoMdAdd className="me-1 mb-1" />
                Anexar comprovante
              </CButton>
            </CNavItem>
          </CHeaderNav>
          <DocFileList data={userDuplicates} refreshList={refreshList} />
          {openCreateModal && (
            <DocFileCreate
              open={openCreateModal}
              docType="receipt"
              handleClose={handleClose}
              refreshList={refreshList}
            />
          )}
        </CContainer>
      )}
    </>
  )
}
export default Receipts
