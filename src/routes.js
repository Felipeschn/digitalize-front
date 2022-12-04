import React from 'react'

const Home = React.lazy(() => import('./views/home/Home'))
const Duplicates = React.lazy(() => import('./views/duplicates/Duplicates'))
const Receipts = React.lazy(() => import('./views/receipts/Receipts'))
const Contracts = React.lazy(() => import('./views/contracts/Contracts'))
const Notations = React.lazy(() => import('./views/notations/Notations'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Home },
  { path: '/segundas-vias', exact: true, name: '2ª Via', element: Duplicates },
  { path: '/comprovantes', exact: true, name: 'Comprovantes', element: Receipts },
  { path: '/contratos', exact: true, name: 'Contratos', element: Contracts },
  { path: '/anotacoes', exact: true, name: 'Anotações', element: Notations },
  { path: '/outros', exact: true, name: 'Outros', element: Notations },
]

export default routes
