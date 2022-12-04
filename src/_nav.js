import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilHome, cilApps } from '@coreui/icons'
import { CNavGroup, CNavItem } from '@coreui/react'
import { TfiReceipt, TfiPencilAlt } from 'react-icons/tfi'
import { AiOutlineFilePdf } from 'react-icons/ai'
import { FaFileSignature } from 'react-icons/fa'
import { HiDotsHorizontal } from 'react-icons/hi'

const nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Todas as entradas',
    icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: '2ª Via',
        to: '/segundas-vias',
        icon: <AiOutlineFilePdf className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Comprovantes',
        to: '/comprovantes',
        icon: <TfiReceipt className="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Contratos',
        to: '/contratos',
        icon: <FaFileSignature className="nav-icon" style={{ paddingLeft: '8px' }} />,
      },
      {
        component: CNavItem,
        name: 'Anotações',
        to: '/anotacoes',
        icon: <TfiPencilAlt className="nav-icon" style={{ paddingLeft: '8px' }} />,
      },
      {
        component: CNavItem,
        name: 'Outros',
        to: '/outros',
        icon: <HiDotsHorizontal className="nav-icon" style={{ paddingLeft: '8px' }} />,
      },
    ],
  },
]

export default nav
