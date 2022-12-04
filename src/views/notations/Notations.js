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
import NotationDetails from './NotationDetail'
import CreateNotationModal from './CreateNotationModal'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function Notations() {
  const { currentUserId } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState(false)
  const [userNotations, setUserNotations] = useState([])
  const [expandedRow, setExpandedRow] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const { data } = await api.get(`user-docfile/${currentUserId}`, {
        params: { docType: 'notation' },
      })
      setUserNotations(data || [])
      setExpandedRow([data[0].docFileId])
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

  const getNotations = (notation) => {
    const expanded = !!expandedRow.find((docFileId) => docFileId === notation.docFileId)
    return (
      <>
        <CListGroup key={notation.docFileId}>
          <CListGroupItem
            className="mb-2"
            key={`${notation.docFileId}-div`}
            component="a"
            active={expanded}
            style={{ width: '25rem', cursor: 'pointer' }}
            onClick={() => setExpandedRow([notation.docFileId])}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {notation.title.length > 23
                  ? `${notation.title.substr(0, 23)} ...`
                  : notation.title}
              </h5>
              <small>{moment(notation.createdAt).startOf().fromNow(true)} atrás</small>
            </div>
            <p className="mb-1">
              {notation.description.length > 27
                ? `${notation.description.substr(0, 30)} ...`
                : notation.description}
            </p>
          </CListGroupItem>
        </CListGroup>
        {/* INFO DETAILS */}
        {expanded && <NotationDetails notation={notation} refreshList={refreshList} />}
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
                Adicionar anotação
              </CButton>
            </CNavItem>
          </CHeaderNav>
          {userNotations.map((notation) => getNotations(notation))}
          {openCreateModal && (
            <CreateNotationModal
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
export default Notations
