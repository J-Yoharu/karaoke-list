export const required = value => (value && Boolean(value)) || 'Obrigatório'

export const email = value =>
  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Este campo precisa ser um e-mail válido' : true

export const comparePassword = (value, compare) => (value === compare ? true : 'As senhas estão diferentes')
