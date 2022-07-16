export const getLetters = () => {
  const letters = []
  for (let letterCode = 65; letterCode <= 90; letterCode++) {
    let letter = String.fromCharCode(letterCode)
    letters.push(letter)
  }
  return letters
}

export const capitalize = name => {
  return name
    .split(' ')
    .map(n => n.charAt(0).toUpperCase() + n.slice(1))
    .join(' ')
}

export const isNumber = char => {
  const charCode = char.charCodeAt()
  return charCode >= 48 && charCode <= 57 ? true : false
}

export const isString = char => {
  const charCode = char.charCodeAt()
  return charCode >= 65 && charCode <= 121 ? true : false
}
