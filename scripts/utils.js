export const formatTime = (unixTime, timeZone) => {
  const date = new Date((unixTime + timeZone) * 1000)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600).toString().padStart(2, '0')
  const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

export const getWindDirection = (degrees) => {
  const directions = [
    'Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'
  ]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}