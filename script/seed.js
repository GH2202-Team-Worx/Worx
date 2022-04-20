const db = require('../server/db/db')
const Product = require('../server/db/models/Product')

const products = [{
  name: 'Blue Hickory',
  description: 'Here’s our second time working with hickory! This gorgeous bowl has been an eye catcher from the moment we poured it, it’s beauty is just out of this world!',
  material: 'Hickory',
  epoxyColor: 'blue',
  price: 200.00,
  category: 'Bowl',
  image: 'https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg',
  customizable: true
}, {
  name: 'Jewelry box',
  description: 'Get your own custom stained box, the perfect gift idea for any event you\'re attending!',
  material: 'Poplar',
  epoxyColor: 'wax',
  price: 20.00,
  category: 'Box',
  image: 'https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg',
  customizable: true
}, {
  name: 'Hickory bowl',
  description: 'Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!',
  material: 'Hickory',
  epoxyColor: 'wax',
  price: 30.00,
  category: 'Bowl',
  image: 'https://lh3.googleusercontent.com/V1yslY8Q4QWYFm-PnqIlAw7_Az3sGH60VubxTwhOazdC4qIn2v3dLzLVKd2YyiymJ_8z4wmlorQwnLWUk1r72nYoIl6WyZIhmSQUZKIMWp_iqe_i_DSVLcUD8KYt6PCkJe-aXtfl=w2400',
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
