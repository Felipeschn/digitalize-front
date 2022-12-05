import React, { useEffect, useState, useContext } from 'react'
import api from 'src/api'
import {
  CHeaderNav,
  CNavItem,
  CContainer,
  CListGroup,
  CListGroupItem,
  CButton,
  CSpinner,
} from '@coreui/react'
import { IoMdAdd } from 'react-icons/io'
import { AuthContext } from 'src/context/AuthContext'
import moment from 'moment'
import ReceiptDetails from './ReceiptDetails'
import CreateReceiptModal from './CreateReceiptModal'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function Receipts() {
  const { currentUserId } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState(false)
  const [userDuplicates, setUserDuplicates] = useState([])
  const [expandedRow, setExpandedRow] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const { data } = await api.get(`user-docfile/${currentUserId}`, {
        params: { docType: 'receipt' },
      })
      setUserDuplicates(data || [])
      setExpandedRow([data[0]?.docFileId])
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

  const getRow = (receipt) => {
    const expanded = !!expandedRow.find((docFileId) => docFileId === receipt.docFileId)
    return (
      <>
        <CListGroup key={receipt.docFileId}>
          <CListGroupItem
            className="mb-2"
            key={`${receipt.docFileId}-div`}
            component="a"
            active={expanded}
            style={{ width: '25rem', cursor: 'pointer' }}
            onClick={() => setExpandedRow([receipt.docFileId])}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {receipt.title.length > 23 ? `${receipt.title.substr(0, 23)} ...` : receipt.title}
              </h5>
              <small>{moment(receipt.createdAt).startOf().fromNow(true)} atrás</small>
            </div>
            <p className="mb-1">
              {receipt.description.length > 27
                ? `${receipt.description.substr(0, 30)} ...`
                : `${receipt.description.substr(0, 30)}`}
            </p>
          </CListGroupItem>
        </CListGroup>
        {expanded && <ReceiptDetails receipt={receipt} refreshList={refreshList} />}
      </>
    )
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
              <CButton color="success" onClick={() => setOpenCreateModal(true)}>
                <IoMdAdd className="me-1 mb-1" />
                Anexar comprovante
              </CButton>
            </CNavItem>
          </CHeaderNav>
          {userDuplicates.map((receipt) => getRow(receipt))}
          {openCreateModal && (
            <CreateReceiptModal
              open={openCreateModal}
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
