import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from 'src/context/AuthContext'
import api from 'src/api'
import FileViewer from 'src/components/FileViewer'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CModal,
  CRow,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CSpinner,
  CCardText,
} from '@coreui/react'

function Dashboard() {
  const { currentUserId } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [fileModal, setFileModal] = useState({})
  const [userDuplicates, setUserDuplicates] = useState([])
  const [userReceipts, setUserReceipts] = useState([])
  const [userContracts, setUserContracts] = useState([])
  const [userNotations, setUserNotations] = useState([])
  const [userGenerics, setUserGenerics] = useState([])

  const fetchData = async (docType) => {
    const { data } = await api.get(`user-docfile/${currentUserId}`, {
      params: { docType },
    })
    return data.map((elem) => ({
      title: elem.title,
      description: elem.description,
      bucketUrl: elem.bucketUrl,
    }))
  }

  const fetchUserData = async (docTypes) => {
    const requests = docTypes.map((docType) => fetchData(docType))
    return Promise.all(requests)
  }

  useEffect(() => {
    setIsLoading(true)
    fetchUserData(['duplicate', 'receipt', 'contract', 'notation', 'generic'])
      .then((response) => {
        setUserDuplicates(response[0])
        setUserReceipts(response[1])
        setUserContracts(response[2])
        setUserNotations(response[3])
        setUserGenerics(response[4])
      })
      .then(() => setIsLoading(false))
  }, [])

  const handleClose = () => {
    setOpenModal(false)
  }

  const progressExample = [
    { title: '2ª Via', value: userDuplicates.length },
    { title: 'Comprovantes', value: userReceipts.length },
    { title: 'Contratos', value: userContracts.length },
    { title: 'Anotações', value: userNotations.length },
    { title: 'Outros', value: userGenerics.length },
  ]

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
        <>
          <CCard className="mb-4">
            <CCardBody>
              <CRow>
                <CCol sm={5}>
                  <h4 id="traffic" className="card-title mb-0">
                    Registros
                  </h4>
                </CCol>
              </CRow>
            </CCardBody>
            <CCardFooter>
              <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                {progressExample.map((item, index) => (
                  <CCol className="mb-sm-2 mb-0" key={index}>
                    <div className="border-start border-start-4 border-start-dark py-1 px-3 mb-3">
                      <div className="text-medium-emphasis">{item.title}</div>
                      <strong>{item.value}</strong>
                    </div>
                  </CCol>
                ))}
              </CRow>
            </CCardFooter>
          </CCard>
          <CModal
            alignment="center"
            scrollable
            backdrop="static"
            size="lg"
            visible={openModal}
            onClose={() => handleClose()}
          >
            <CModalHeader>
              <CModalTitle>{fileModal.title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <CCardText>{fileModal.description}</CCardText>
              {fileModal.bucketUrl && <FileViewer url={fileModal.bucketUrl} />}
            </CModalBody>
          </CModal>
          {userDuplicates.length ? (
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader>2ª Via</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userDuplicates.map((duplicate, index) => {
                        if (index > 5) {
                          return
                        }
                        return (
                          <>
                            <CCol sm={2} key={index}>
                              <CCard
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setOpenModal(true)
                                  setFileModal(duplicate)
                                }}
                              >
                                <div className="py-1 px-3 mb-3">
                                  {duplicate.title.length > 23
                                    ? `${duplicate.title.substr(0, 23)} ...`
                                    : duplicate.title}
                                </div>
                                <div className="py-1 px-3 mb-3">
                                  {duplicate.description.length > 23
                                    ? `${duplicate.description.substr(0, 23)} ...`
                                    : duplicate.description}
                                </div>
                              </CCard>
                            </CCol>
                          </>
                        )
                      })}
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            ''
          )}
          {userReceipts.length ? (
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader>Comprovantes</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userReceipts.map((receipt, index) => {
                        if (index > 5) {
                          return
                        }
                        return (
                          <>
                            <CCol sm={2} key={index}>
                              <CCard
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setOpenModal(true)
                                  setFileModal(receipt)
                                }}
                              >
                                <div className="py-1 px-3 mb-3">
                                  {receipt.title.length > 23
                                    ? `${receipt.title.substr(0, 23)} ...`
                                    : receipt.title}
                                </div>
                                <div className="py-1 px-3 mb-3">
                                  {receipt.description.length > 23
                                    ? `${receipt.description.substr(0, 23)} ...`
                                    : receipt.description}
                                </div>
                              </CCard>
                            </CCol>
                          </>
                        )
                      })}
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            ''
          )}
          {userContracts.length ? (
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader>Contratos</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userContracts.map((contract, index) => {
                        if (index > 5) {
                          return
                        }
                        return (
                          <>
                            <CCol sm={2} key={index}>
                              <CCard
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setOpenModal(true)
                                  setFileModal(contract)
                                }}
                              >
                                <div className="py-1 px-3 mb-3">
                                  {contract.title.length > 23
                                    ? `${contract.title.substr(0, 23)} ...`
                                    : contract.title}
                                </div>
                                <div className="py-1 px-3 mb-3">
                                  {contract.description.length > 23
                                    ? `${contract.description.substr(0, 23)} ...`
                                    : contract.description}
                                </div>
                              </CCard>
                            </CCol>
                          </>
                        )
                      })}
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            ''
          )}
          {userNotations.length ? (
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader>Anotações</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userNotations.map((notation, index) => {
                        if (index > 5) {
                          return
                        }
                        return (
                          <>
                            <CCol sm={2} key={index}>
                              <CCard
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setOpenModal(true)
                                  setFileModal(notation)
                                }}
                              >
                                <div className="py-1 px-3 mb-3">
                                  {notation.title.length > 23
                                    ? `${notation.title.substr(0, 23)} ...`
                                    : notation.title}
                                </div>
                                <div className="py-1 px-3 mb-3">
                                  {notation.description.length > 23
                                    ? `${notation.description.substr(0, 23)} ...`
                                    : notation.description}
                                </div>
                              </CCard>
                            </CCol>
                          </>
                        )
                      })}
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            ''
          )}
          {userGenerics.length ? (
            <CRow>
              <CCol xs>
                <CCard className="mb-4">
                  <CCardHeader>Outros</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userGenerics.map((generic, index) => {
                        if (index > 5) {
                          return
                        }
                        return (
                          <>
                            <CCol sm={2} key={index}>
                              <CCard
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  setOpenModal(true)
                                  setFileModal(generic)
                                }}
                              >
                                <div className="py-1 px-3 mb-3">
                                  {generic.title.length > 23
                                    ? `${generic.title.substr(0, 23)} ...`
                                    : generic.title}
                                </div>
                                <div className="py-1 px-3 mb-3">
                                  {generic.description.length > 23
                                    ? `${generic.description.substr(0, 23)} ...`
                                    : generic.description}
                                </div>
                              </CCard>
                            </CCol>
                          </>
                        )
                      })}
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          ) : (
            ''
          )}
        </>
      )}
    </>
  )
}

export default Dashboard
