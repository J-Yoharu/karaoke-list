import moment from 'moment'

export const setTimeoutExpirationTime = (unixExpirationTime, callback) => {
  let expirationTime = moment(unixExpirationTime)
  let diffBetweenDates = expirationTime.diff(moment())
  var expirationMs = moment.duration(diffBetweenDates).asMilliseconds()

  if (expirationMs < 0) return callback(expirationMs)

  setTimeout(() => {
    // Prevenir que o token expire
  }, expirationMs)
}
