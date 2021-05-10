// Модель user
const user = {
  id: '0',
  username: 'Дмитрий Василевский',
  email: 'divasilevski@gmail.com',
  photo: 'blob',
}

// Модель product
const product = {
  id: '0',
  title: 'Штаны',
  describtion: 'Не ношены, отвечаю',
  price: 1000,
  photos: ['blob', 'blob', 'blob'],

  status: 'sale', // продажа товара
}
const product = {
  id: '1',
  title: 'Сноуборд',
  describtion: 'Дубовая доска',
  price: 1500,
  photos: ['blob', 'blob', 'blob'],

  status: 'reservation', // бронирования товара в прокате
  per: 'day',
  min: 10, // минимальный период аренды в днях в часах хуй знает, нужно думать
  deposit: 1500, // залог
}

// Модель comment
const comment = {
  id: '0',
  user: user,
  message:
    'Сегодня покатались всей семьёй! Это были великолепные 2 часа! С непривычки болит все что можно🤭',
  photos: ['blob', 'blob', 'blob'], // под вопросом
}

// Модель organization
const organization = {
  id: '0',
  title: 'БЕРИ КАТАЙ',
  describtion: 'Прокат сноубордов | Туры в Шерегеш', // 2000 символов
  foundation: 'Дата основания',
  site: 'instagram.com/beri_katai',
  phone: '+7 (923) 797-06-67',
  time: 'eжедневно 10:00 - 20:00', // под вопросом

  city: 'Бийск',
  address: 'Декабристов 27/1',
  coords: {
    lat: '55.8782557',
    lon: '37.65372',
  },

  photos: ['blob', 'blob', 'blob'],
  rating: '4.5',
  comments: [comment, comment, comment], // Тут могут быть id или типо того пока не понятно
  products: [product, product, product, product, product], // Тут могут быть id или типо того пока не понятно
}

// Модель event
const event = {
  id: '0',
  title: 'Сноуборд Фест',
  describtion:
    'Присоединяйтесь, съедем и поломаем ноги вместе! Хопа и въебался в столб.',
  date: 'Дата',
  site: 'snowboardfest.com',

  city: 'Бийск',
  address: 'Декабристов 27/1',
  coords: {
    lat: '55.8782557',
    lon: '37.65372',
  },

  photos: ['blob', 'blob', 'blob'],
  comments: [comment, comment, comment], // Тут могут быть id или типо того пока не понятно
  participants: [user, user, user], // Тут могут быть id или типо того пока не понятно
  organizations: [organization, organization, organization], // Тут могут быть id или типо того пока не понятно
}
