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