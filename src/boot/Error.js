class ErrorTratado extends Error {
  constructor (error) {
    let msg = error
    let details = []
    if (error && error.response) {
      if (error.response.data && error.response.data.message) {
        if (error.response.data.status && error.response.data.status === 404) {
          msg = 'O caminho ' + error.response.data.path + ' não foi encontrado! Erro 404.'
        } else {
          msg = error.response.data.message
        }
        if (error.response.data.details) {
          details = error.response.data.details
        }
      } else {
        if (error.response.status && error.response.status === 400) {
          msg = 'Parâmetro(s) incorreto(s)! Erro 400.'
          if (error.response.config && error.response.config.data) {
            details = [error.response.config.data]
          }
        }
      }
    }
    super(msg)
    this.name = 'ErrorTratado'
    this.details = details
  }
}

export default ({ Vue }) => {
  Vue.prototype.$ErrorTratado = ErrorTratado
}

export { ErrorTratado }
