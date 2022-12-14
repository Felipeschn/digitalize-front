export function NormalizeDocFile(data) {
  switch (data) {
    case 'duplicate':
      return 'Segunda via'
    case 'receipt':
      return 'Comprovante'
    case 'contract':
      return 'Contrato'
    case 'notation':
      return 'Anotação'
    case 'generic':
      return 'Outros'
    default:
      return ''
  }
}
