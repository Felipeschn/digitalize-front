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
import DuplicateDetails from './DuplicateDetails'
import CreateDuplicateModal from './CreateDuplicateModal'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function Duplicates() {
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
        params: { docType: 'duplicate' },
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

  const getRow = (duplicate) => {
    const expanded = !!expandedRow.find((docFileId) => docFileId === duplicate.docFileId)
    return (
      <>
        <CListGroup key={duplicate.docFileId}>
          <CListGroupItem
            className="mb-2"
            key={`${duplicate.docFileId}-div`}
            component="a"
            active={expanded}
            style={{ width: '25rem', cursor: 'pointer' }}
            onClick={() => setExpandedRow([duplicate.docFileId])}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {duplicate.title.length > 23
                  ? `${duplicate.title.substr(0, 23)} ...`
                  : duplicate.title}
              </h5>
              <small>{moment(duplicate.createdAt).startOf().fromNow(true)} atrás</small>
            </div>
            <p className="mb-1">
              {duplicate.description.length > 27
                ? `${duplicate.description.substr(0, 30)} ...`
                : `${duplicate.description.substr(0, 30)}`}
            </p>
          </CListGroupItem>
        </CListGroup>
        {expanded && <DuplicateDetails duplicate={duplicate} refreshList={refreshList} />}
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
              <CButton color="primary" onClick={() => setOpenCreateModal(true)}>
                <IoMdAdd className="me-1 mb-1" />
                Anexar segunda via
              </CButton>
            </CNavItem>
          </CHeaderNav>
          {userDuplicates.map((duplicate) => getRow(duplicate))}
          {openCreateModal && (
            <CreateDuplicateModal
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
export default Duplicates
