import { getWindDirection, formatTime, formatDuration, formatString } from './utils.js'

export const mapWeather = (data) => {
  const condition = formatString(data.weather[0].description)

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
    feels_like: Math.round(data.main.feels_like),
    icon: data.weather[0].icon
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
      value: `${Math.round(data.wind.speed)} м/с`,
      more: {
        progressBar: false,
        firstDescription: windDirection,
      }
    }
  ]
}

export const map24HoursCards = (data) => {
  const timezone = data.city.timezone

  return {
    title: "на 24 часа",
    id: "tab_24h",
    items: data.list.slice(0,8).map(item => {
      const description = item.weather[0].description

      return {
        time: formatTime(item.dt, timezone),
        iconSrc: `./public/icons/weather-icons/${item.weather[0].icon}.svg`,
        iconAlt: `${formatString(description)}`,
        degrees: `${Math.round(item.main.temp)}°`,
      }
    })
  }
}

export const map5DaysCards = (data) => {
  const timezone = data.city.timezone

  const groups = {}

  data.list.forEach(item => {
      const localDate = new Date((item.dt + timezone) * 1000)
      const key = localDate.toISOString().slice(0,10)

    if (!groups[key]) {
      groups[key] = []
    }

    groups[key].push(item)
  })

  const days = Object.values(groups).slice(0, 5)

  const shortMonths = ['янв.','февр.','марта','апр.','мая','июня','июля','авг.','сент.','окт.','нояб.','дек.']
  const shortDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

  return {
    title: "на 5 дней",
    id: "tab_5d",
    items: days.map(dayItems => {
      const date = new Date((dayItems[0].dt + timezone) * 1000)
      const dd = String(date.getUTCDate()).padStart(2, '0')

      const tempMinArray = []
      const tempMaxArray = []
      dayItems.forEach(item => {
        tempMinArray.push(item.main.temp_min)
        tempMaxArray.push(item.main.temp_max)
      })

      const tempMin = tempMinArray.length > 1 ? Math.min(...tempMinArray) : tempMinArray[0]
      const tempMax = tempMaxArray.length > 1 ? Math.max(...tempMaxArray) : tempMaxArray[0]

      const dayPoint = dayItems.find(item => item.sys.pod === 'd')
      const noonPoint = dayPoint ?? dayItems[Math.floor(dayItems.length / 2)]

      return {
        day: shortDays[date.getUTCDay()],
        date: `${dd} ${shortMonths[date.getUTCMonth()]}`,
        fullDate: date.toISOString().slice(0,10),
        iconSrc: `./public/icons/weather-icons/${noonPoint.weather[0].icon}.svg`,
        iconAlt: formatString(noonPoint.weather[0].description),
        degrees: `от ${Math.round(tempMin)}° до ${Math.round(tempMax)}°`,
      }
    }),
  }
}