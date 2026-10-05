exports.handler = async (event) => {
  const lat = event.queryStringParameters?.lat
  const lon = event.queryStringParameters?.lon

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Не переданы координаты' }),
    }
  }

  const apiKey = process.env.OPENWEATHER_API_KEY

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'OPENWEATHER_API_KEY не настроен' }),
    }
  }

  const params = new URLSearchParams({
    lat,
    lon,
    appid: apiKey,
    units: 'metric',
    lang: 'ru',
  })

  const url = `https://api.openweathermap.org/data/2.5/forecast?${params}`
  
  try {
    const response = await fetch(url)
    const data = await response.json()

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Не удалось получить данные OpenWeatherMap' }),
    }
  }
}