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
import GenericDetails from './GenericDetails'
import CreateGenericModal from './CreateGenericModal'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function Generic() {
  const { currentUserId } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState(false)
  const [userGenerics, setUserGenerics] = useState([])
  const [expandedRow, setExpandedRow] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const { data } = await api.get(`user-docfile/${currentUserId}`, {
        params: { docType: 'generic' },
      })
      setUserGenerics(data || [])
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

  const getRow = (generic) => {
    const expanded = !!expandedRow.find((docFileId) => docFileId === generic.docFileId)
    return (
      <>
        <CListGroup key={generic.docFileId}>
          <CListGroupItem
            className="mb-2"
            key={`${generic.docFileId}-div`}
            component="a"
            active={expanded}
            style={{ width: '25rem', cursor: 'pointer' }}
            onClick={() => setExpandedRow([generic.docFileId])}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {generic.title.length > 23 ? `${generic.title.substr(0, 23)} ...` : generic.title}
              </h5>
              <small>{moment(generic.createdAt).startOf().fromNow(true)} atrás</small>
            </div>
            <p className="mb-1">
              {generic.description.length > 27
                ? `${generic.description.substr(0, 30)} ...`
                : `${generic.description.substr(0, 30)}`}
            </p>
          </CListGroupItem>
        </CListGroup>
        {expanded && <GenericDetails generic={generic} refreshList={refreshList} />}
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
                Anexar outros
              </CButton>
            </CNavItem>
          </CHeaderNav>
          {userGenerics.map((generic) => getRow(generic))}
          {openCreateModal && (
            <CreateGenericModal
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
export default Generic
