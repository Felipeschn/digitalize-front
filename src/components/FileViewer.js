import React from 'react'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

function FileViewer({ url }) {
  const docs = [{ uri: url }]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DocViewer
        config={{ header: { disableHeader: true } }}
        style={{
          width: 800,
          height: 665,
        }}
        pluginRenderers={DocViewerRenderers}
        documents={docs}
      />
    </div>
  )
}

export default FileViewer
