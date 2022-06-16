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
