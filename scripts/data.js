export const meteoData = [
    {
        title: 'Влажность',
        icon: './public/icons/meteodata/humidity.svg',
        value: '75 %',
        more: {
            progressBar: true,
            progressValue: 75,
            progressMin: 0,
            progressMax: 100, 
            firstDescription: '0%',
            secondDescription: '100%'
        }
    },
    {
        title: 'Давление',
        icon: './public/icons/meteodata/barometr.svg',
        value: '761',
        more: {
            progressBar: true,
            progressValue: 761,
            progressMin: 658,
            progressMax: 812, 
            firstDescription: 'Повышенное',
        }
    },
    {
        title: 'Видимость',
        icon: './public/icons/meteodata/visibility.svg',
        value: '28 км',
        more: {
            progressBar: true,
            progressValue: 28,
            progressMin: 0,
            progressMax: 100, 
            firstDescription: 'Нормальная',
        }
    },
    {
        title: 'Рассвет',
        icon: './public/icons/meteodata/sunrise.svg',
        value: '8:42',
        more: {
            progressBar: false,
            firstDescription: 'Прошло: 02:47',
        }
    },
    {
        title: 'Закат',
        icon: './public/icons/meteodata/sunset.svg',
        value: '16:37',
        more: {
            progressBar: false,
            firstDescription: 'Осталось: 05:08',
        }
    },
    {
        title: 'Сила ветра',
        icon: './public/icons/meteodata/direction.svg',
        value: '2 м/с',
        more: {
            progressBar: false,
            firstDescription: 'Северо-западный',
        }
    }
]

export const twentyFourHoursData = [
    {
        time: '12:00',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: '-7°',
    },
    {
        time: '15:00',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: '-5°',
    },
    {
        time: '18:00',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: '-7°',
    },
    {
        time: '21:00',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: '-9°',
    },
    {
        time: '00:00',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: '-11°',
    },
    {
        time: '12:00',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: '-7°',
    },
]

export const fiveDaysData = [
    {
        day: 'Вс',
        date: '07 янв.',
        fullDate: '2026-01-07',
        iconSrc: './public/icons/time=day, state=few clouds.svg',
        iconAlt: 'Переменная облачность',
        degrees: 'от -17° до -11°',
    },
    {
        day: 'Пн',
        date: '08 янв.',
        fullDate: '2026-01-08',
        iconSrc: './public/icons/time=day, state=few clouds.svg',
        iconAlt: 'Переменная облачность',
        degrees: 'от -16° до -8°',
    },
    {
        day: 'Вт',
        date: '09 янв.',
        fullDate: '2026-01-09',
        iconSrc: './public/icons/broken-clouds.svg',
        iconAlt: 'Облачно',
        degrees: 'от -8° до -2°',
    },
    {
        day: 'Ср',
        date: '10 янв.',
        fullDate: '2026-01-10',
        iconSrc: './public/icons/time=day, state=few clouds.svg',
        iconAlt: 'Переменная облачность',
        degrees: 'от -17° до -11°',
    },
]