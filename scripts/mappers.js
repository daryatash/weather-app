import { getWindDirection, formatTime, formatDuration } from './utils.js'

export const mapWeather = (data) => {
  const condition = data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1)

  const date = new Date((Math.floor(Date.now() / 1000) + data.timezone) * 1000)
  const days = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота']
  const day = days[date.getUTCDay()]

  const yyyy = date.getUTCFullYear()
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0')
  const dd = String(date.getUTCDate()).padStart(2, '0')
  const iso = `${yyyy}-${mm}-${dd}`

  const months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
  const dayAndMonth = `${dd} ${months[date.getUTCMonth()]}`

  return {
    city: data.name,
    day: day,
    dateISO: iso,
    dateDayAndMonth: dayAndMonth,
    time: formatTime(Math.floor(Date.now() / 1000), data.timezone),
    temperature: Math.round(data.main.temp),
    condition: condition,
    feels_like: Math.round(data.main.feels_like)
  }
}

export const mapWeatherCards = (data) => {
  const pressure = Math.round(data.main.pressure * 0.750062)
  const visibility = Math.round(data.visibility / 1000)
  const sunrise = formatTime(data.sys.sunrise, data.timezone)
  const sunset = formatTime(data.sys.sunset, data.timezone)
  const windDirection = getWindDirection(data.wind.deg)
  const sinceSunrise = formatDuration(Math.max(0, Math.floor(Date.now() / 1000) - data.sys.sunrise))
  const untilSunset = formatDuration(Math.max(0, data.sys.sunset - Math.floor(Date.now() / 1000)))

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
}