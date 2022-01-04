import { date } from 'quasar'

/**
 * Referencia da expressão regular
 * https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s07.html
 * Seção: Date and time, with optional fractional seconds and time zone (e.g., 2008-08-30T01:45:36 or 2008-08-30T01:45:36.123Z). This is the XML Schema dateTime type
 *
 */
const dateTimeFormat = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])?$/
const dateFormat = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])$/

/**
 * Função usada para desserializar strings fazendo com que os campos que representam datas sejam criados (após o parsing) como objetos Date do javascript
 * @param data: Texto representando um objeto JSON
 * @returns Objeto JSON representado pela string recebida como parametro
 *   a diferença para o parse default é que os campos string no padrão de data (const dateTimeFormat) são convertidos em um objeto Date e não deixados como string
 */
function customJsonParse (data) {
  // eslint no-param-reassign:0
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data, function (key, value) {
        return dateTimeReviver(value, key)
      })
    } catch (e) { /* Ignore */ }
  }
  return data
}

/**
 * Função que recebe um objeto e procura por campos string que possua a formatação de data (const dateTimeFormat) transformando-os em objeto Date
 * @param obj
 * @param excludedFields: Campos do objeto que não devem ser considerados no processamento
 */
function reviverDatesFromObject (obj, excludedFields) {
  if (!(excludedFields?.length > 0)) {
    excludedFields = []
  }
  Object.keys(obj).forEach(function (field) {
    if (!excludedFields.includes(field)) {
      if (typeof obj[field] === 'object' && obj[field] !== null) {
        reviverDatesFromObject(obj[field], excludedFields)
      } else {
        obj[field] = dateTimeReviver(obj[field])
      }
    }
  })
}

/**
 * Função que verifica se uma string é uma data de acordo com o padrão "const dateTimeFormat" criando o objeto Date se for o caso
 * @param value: objeto para verificar se é texto com o padrão de data
 * @returns {Date|*}: Data criada ou o próprio valor
 */
function dateTimeReviver (value) {
  if (typeof value === 'string') {
    if (dateFormat.test(value)) {
      // return value
      return new Date(value += 'T00:00:00') // Concatena o time para forçar o JS usar o locale da maquina
    }
    if (dateTimeFormat.test(value)) {
      return new Date(value)
    }
    return value
  } else {
    return value
  }
}

/**
 * Função que força um override na função toJSON do objeto Date alterando a formatação do texto de data gerado no JSON.strinfy
 * Por padrão, o texto de data é gerado em UTC, o que causa a alteração da parte time distorcendo a informação
 */
function configureDateToJSON () {
  // eslint-disable-next-line no-extend-native
  Date.prototype.toJSON = function () {
    return date.formatDate(this, 'YYYY-MM-DDTHH:mm:ssZ')
  }
}

export { customJsonParse, reviverDatesFromObject, dateTimeFormat, dateTimeReviver, configureDateToJSON }
