const db = require('../server/db/db')
const Product = require('../server/db/models/Product')

const products = [{
  name: 'Blue Hickory',
  description: 'Here’s our second time working with hickory! This gorgeous bowl has been an eye catcher from the moment we poured it, it’s beauty is just out of this world!',
  material: 'Hickory',
  epoxyColor: 'blue',
  price: 200.00,
  category: 'Bowl',
  image: 'https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/276123626_158077886599088_4538128186652999978_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=N0tLt3VXmlEAX9KWbmJ&_nc_ht=scontent-mia3-1.xx&oh=00_AT9sX3xrEBJ8b8LcArmdNUkEs3z7vHDEfJFcAb386oHKuA&oe=6264C172',
  customizable: true
}, {
  name: 'Jewelry box',
  description: 'Get your own custom stained box, the perfect gift idea for any event your attending!Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!',
  material: 'Poplar',
  epoxyColor: 'wax',
  price: 20.00,
  category: 'Box',
  image: 'https://scontent-mia3-2.xx.fbcdn.net/v/t39.30808-6/275627014_156467416760135_2314966038615759731_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=X7_hcUuQyxQAX--erfZ&_nc_ht=scontent-mia3-2.xx&oh=00_AT9ge395gMEXPAoEfnTAJRtn62hwslJqeq46J2aaBikovA&oe=62645900',
  customizable: true
}, {
  name: 'Hickory bowl',
  description: 'Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!',
  material: 'Hickory',
  epoxyColor: 'wax',
  price: 30.00,
  category: 'Bowl',
  image: 'https://scontent-mia3-2.xx.fbcdn.net/v/t39.30808-6/275585953_156078566799020_104830131098927512_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=ttD-1p2WX-8AX_fIVbO&_nc_ht=scontent-mia3-2.xx&oh=00_AT9qXe438DDsY_0UUem_CRlsIt0ftE2Ef4j_nZ1ZrdqpkA&oe=62649B61',
  customizable: true
}]

async function seed () {
  try {
    await db.sync({ force: true })

    await Promise.all(products.map(product => {
      return Product.create(product)
    }))
  } catch (err) {
    console.log(err)
  }
}

module.exports = seed
if (require.main === module) {
  seed()
    .then(() => {
      console.log(('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(err)
      db.close()
    })
}
