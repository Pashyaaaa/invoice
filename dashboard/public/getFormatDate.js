export function getFormatDate(dateString) {
  const date = dateString.substr(0, 10)
  const hours = dateString.substr(11, 5)

  return `${date} (${hours})`
}
