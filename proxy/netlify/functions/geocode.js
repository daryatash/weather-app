exports.handler = async (event) => {
  const query = event.queryStringParameters?.q

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Не передан параметр q' }),
    }
  }

  const token = process.env.MAPBOX_TOKEN

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'MAPBOX_TOKEN не настроен' }),
    }
  }

  const params = new URLSearchParams({
    q: query,
    access_token: token,
    language: 'ru',
    types: 'place',
    limit: '10',
    autocomplete: 'true',
    proximity: 'ip',
  })

  const url = `https://api.mapbox.com/search/geocode/v6/forward?${params}`

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
      body: JSON.stringify({ error: 'Не удалось получить данные Mapbox' }),
    }
  }
}