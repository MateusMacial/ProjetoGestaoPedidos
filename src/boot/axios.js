import axios from 'axios/index'
import { customJsonParse, configureDateToJSON } from '../utils/json-date-extension'

configureDateToJSON()

const axiosInstance = axios.create({
  timeout: 6000000,
  baseURL: 'http://localhost:8081/wspedidos/',
  headers: {
    'Content-Type': 'application/json'
  },
  transformResponse: [customJsonParse] // Função responsavel por reconstruir os objetos DateTime que vem do servidor em Date do JS
})

export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}

export { axiosInstance }
