import React, { useState } from 'react'
import { CRow, CListGroup, CListGroupItem, CCol } from '@coreui/react'
import moment from 'moment'
import 'moment/locale/pt-br'

import { DocFileDetails } from 'src/components/index'
moment.locale('pt-br')

function DocFileList({ data, refreshList }) {
  if (data.length === 0) {
    return
  }
  const [expandedRow, setExpandedRow] = useState([data[0]])
  return (
    <>
      <CRow>
        <CCol sm={3} md={3} lg={3}>
          {data.map((e, index) => {
            const expanded = !!expandedRow.find((elem) => elem.docFileId === e.docFileId)
            return (
              <CListGroup key={index}>
                <CListGroupItem
                  className="mb-2"
                  key={`${e.docFileId}-div`}
                  component="a"
                  active={expanded}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setExpandedRow([e])}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">
                      {e.title.length > 23 ? `${e.title.substr(0, 23)} ...` : e.title}
                    </h5>
                    <small>{moment(e?.createdAt).startOf().fromNow(true)} atrás</small>
                  </div>
                  <p className="mb-1">
                    {e?.description?.length > 27
                      ? `${e?.description?.substr(0, 30)} ...`
                      : `${e?.description?.substr(0, 30)}`}
                  </p>
                </CListGroupItem>
              </CListGroup>
            )
          })}
        </CCol>
        <CCol sm={2} md={5} lg={9}>
          <DocFileDetails data={expandedRow[0]} refreshList={refreshList} />
        </CCol>
      </CRow>
    </>
  )
}

export default DocFileList
