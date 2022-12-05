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
import ContractDetails from './ContractDetails'
import CreateContractModal from './CreateContractModal'
import 'moment/locale/pt-br'

moment.locale('pt-br')

function Contracts() {
  const { currentUserId } = useContext(AuthContext)
  const [fetchData, setFetchData] = useState(false)
  const [userContracts, setUserContracts] = useState([])
  const [expandedRow, setExpandedRow] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setIsLoading(true)
      const { data } = await api.get(`user-docfile/${currentUserId}`, {
        params: { docType: 'contract' },
      })
      setUserContracts(data || [])
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

  const getRow = (contract) => {
    const expanded = !!expandedRow.find((docFileId) => docFileId === contract.docFileId)
    return (
      <>
        <CListGroup key={contract.docFileId}>
          <CListGroupItem
            className="mb-2"
            key={`${contract.docFileId}-div`}
            component="a"
            active={expanded}
            style={{ width: '25rem', cursor: 'pointer' }}
            onClick={() => setExpandedRow([contract.docFileId])}
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">
                {contract.title.length > 23
                  ? `${contract.title.substr(0, 23)} ...`
                  : contract.title}
              </h5>
              <small>{moment(contract.createdAt).startOf().fromNow(true)} atrás</small>
            </div>
            <p className="mb-1">
              {contract.description.length > 27
                ? `${contract.description.substr(0, 30)} ...`
                : `${contract.description.substr(0, 30)}`}
            </p>
          </CListGroupItem>
        </CListGroup>
        {expanded && <ContractDetails contract={contract} refreshList={refreshList} />}
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
                Anexar contrato
              </CButton>
            </CNavItem>
          </CHeaderNav>
          {userContracts.map((contract) => getRow(contract))}
          {openCreateModal && (
            <CreateContractModal
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
export default Contracts
