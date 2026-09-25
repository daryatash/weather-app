// export const meteoData = [
//     {
//         title: 'Влажность',
//         icon: './public/icons/meteodata/humidity.svg',
//         value: '75 %',
//         more: {
//             progressBar: true,
//             progressValue: 75,
//             progressMin: 0,
//             progressMax: 100, 
//             firstDescription: '0%',
//             secondDescription: '100%'
//         }
//     },
//     {
//         title: 'Давление',
//         icon: './public/icons/meteodata/barometr.svg',
//         value: '761',
//         more: {
//             progressBar: true,
//             progressValue: 761,
//             progressMin: 658,
//             progressMax: 812, 
//             firstDescription: 'Повышенное',
//         }
//     },
//     {
//         title: 'Видимость',
//         icon: './public/icons/meteodata/visibility.svg',
//         value: '28 км',
//         more: {
//             progressBar: true,
//             progressValue: 28,
//             progressMin: 0,
//             progressMax: 100, 
//             firstDescription: 'Нормальная',
//         }
//     },
//     {
//         title: 'Рассвет',
//         icon: './public/icons/meteodata/sunrise.svg',
//         value: '8:42',
//         more: {
//             progressBar: false,
//             firstDescription: 'Прошло: 02:47',
//         }
//     },
//     {
//         title: 'Закат',
//         icon: './public/icons/meteodata/sunset.svg',
//         value: '16:37',
//         more: {
//             progressBar: false,
//             firstDescription: 'Осталось: 05:08',
//         }
//     },
//     {
//         title: 'Сила ветра',
//         icon: './public/icons/meteodata/direction.svg',
//         value: '2 м/с',
//         more: {
//             progressBar: false,
//             firstDescription: 'Северо-западный',
//         }
//     }
// ]

const latNsk = 55.0188
const lonNsk = 82.9340
const API_key = '01a4e64120ae63b6e8e5a12837f5c87f'

async function getMeteoData(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=ru&units=metric&appid=01a4e64120ae63b6e8e5a12837f5c87f`)
    if (!response.ok) {
      throw new Error(`HTTP ошибка! Код ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Ошибка: ${error}`)
  }
}

const formatTime = (unixTime, timeZone) => {
  const date = new Date((unixTime + timeZone) * 1000)
  const hours = date.getUTCHours()
  const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 3600).toString().padStart(2, '0')
  const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0')
  return `${hours}:${minutes}`
}

const getWindDirection = (degrees) => {
  const directions = [
    'Северный', 'Северо-восточный', 'Восточный', 'Юго-восточный', 'Южный', 'Юго-западный', 'Западный', 'Северо-западный'
  ]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export const meteoData = await getMeteoData(latNsk, lonNsk).then(data => {
  const pressure = Math.round(data.main.pressure * 0.750062)
  const visibility = Math.round(data.visibility / 1000)
  const sunrise = formatTime(data.sys.sunrise, data.timezone)
  const sunset = formatTime(data.sys.sunset, data.timezone)
  const windDirection = getWindDirection(data.wind.deg)
  const sinceSunrise = formatDuration(Math.max(0, data.dt - data.sys.sunrise))
  const untilSunset = formatDuration(Math.max(0, data.sys.sunset - data.dt))

  return [
    {
      title: 'Влажность',
      icon: './public/icons/meteodata/humidity.svg',
      value: `${data.main.humidity} %`,
      more: {
        progressBar: true,
        progressValue: data.main.humidity,
        progressMin: 0,
        progressMax: 100,
        firstDescription: '0%',
        secondDescription: '100%'
      }
    },
    {
      title: 'Давление',
      icon: './public/icons/meteodata/barometr.svg',
      value: `${pressure}`,
      more: {
        progressBar: true,
        progressValue: pressure,
        progressMin: 658,
        progressMax: 812, 
        firstDescription: pressure < 755 ? 'Пониженное' : pressure > 765 ? 'Повышенное' : 'Нормальное',
      }
    },
    {
      title: 'Видимость',
      icon: './public/icons/meteodata/visibility.svg',
      value: `${visibility} км`,
      more: {
        progressBar: true,
        progressValue: visibility,
        progressMin: 0,
        progressMax: 100, 
        firstDescription: visibility < 1 ? 'Плохая' : visibility < 10 ? 'Пониженная' : visibility > 20 ? 'Отличная' : 'Нормальная',
      }
    },
    {
      title: 'Рассвет',
      icon: './public/icons/meteodata/sunrise.svg',
      value: sunrise,
      more: {
        progressBar: false,
        firstDescription: `Прошло: ${sinceSunrise}`,
      }
    },
    {
      title: 'Закат',
      icon: './public/icons/meteodata/sunset.svg',
      value: sunset,
      more: {
        progressBar: false,
        firstDescription: `Осталось: ${untilSunset}`,
      }
    },
    {
      title: 'Сила ветра',
      icon: './public/icons/meteodata/direction.svg',
      value: `${data.wind.speed} м/с`,
      more: {
        progressBar: false,
        firstDescription: windDirection,
      }
    }
  ]
})