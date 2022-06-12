import { isEmpty } from './index'

export const required = value => (value && value.length ? true : 'Este campo é obrigatório')
export const emailValidator = value => {
  if (isEmpty(value)) {
    return true
  }

  // eslint-disable-next-line
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (Array.isArray(value)) {
    return value.every(val => re.test(String(val)))
  }

  return re.test(String(value)) || 'O endereço de e-mail precisa ser válido'
}

export const passwordValidator = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)

  return (
    // eslint-disable-next-line operator-linebreak
    validPassword ||
    'O campo precisa conter uma letra maiúscula, minuscula, um caractere especial e no mínimo 8 caracteres'
  )
}

export const confirmedValidator = (value, target) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  value === target || 'A senha de confirmação está diferente'

export const between = (value, min, max) => () => {
  const valueAsNumber = Number(value)

  return (Number(min) <= valueAsNumber && Number(max) >= valueAsNumber) || `Enter number between ${min} and ${max}`
}

export const integerValidator = value => {
  if (isEmpty(value)) {
    return true
  }

  if (Array.isArray(value)) {
    return value.every(val => /^-?[0-9]+$/.test(String(val)))
  }

  return /^-?[0-9]+$/.test(String(value)) || 'This field must be an integer'
}

export const regexValidator = (value, regex) => {
  if (isEmpty(value)) {
    return true
  }

  let regeX = regex
  if (typeof regeX === 'string') {
    regeX = new RegExp(regeX)
  }

  if (Array.isArray(value)) {
    return value.every(val => regexValidator(val, { regeX }))
  }

  return regeX.test(String(value)) || 'The Regex field format is invalid'
}

export const alphaValidator = value => {
  if (isEmpty(value)) {
    return true
  }

  // const valueAsString = String(value)

  return /^[A-Z]*$/i.test(String(value)) || 'The Alpha field may only contain alphabetic characters'
}

export const urlValidator = value => {
  if (value === undefined || value === null || value.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/

  return re.test(value) || 'URL is invalid'
}

export const lengthValidator = (value, length) => {
  if (isEmpty(value)) {
    return true
  }

  return value.length === length || `The Min Character field must be at least ${length} characters`
}

export const min = (value, length) => value.length >= length || `O campo precisa conter no mínimo ${length} caracteres`

export const alphaDashValidator = value => {
  if (isEmpty(value)) {
    return true
  }

  const valueAsString = String(value)

  return /^[0-9A-Z_-]*$/i.test(valueAsString) || 'All Character is not valid'
}
