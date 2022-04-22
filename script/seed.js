// const db = require("../server/db/db");
// const Product = require("../server/db/models/Product");
const {
  db,
  Product,
  Order,
  User,
  OrderProduct,
} = require("../server/db/models");

const orderProducts = [
  {
    orderId: 1,
    productId: 1,
    customization: null,
    gift: false,
  },
  {
    orderId: 1,
    productId: 2,
    customization: "Initials TEK",
    gift: true,
  },
  {
    orderId: 2,
    productId: 2,
    customization: null,
    gift: false,
  },
];

const orders = [
  {
    totalPrice: 10.99,
    status: "Processing",
    userId: 1,
  },
  { totalPrice: 15.75, status: "Completed", userId: 2 },
];

const users = [
  {
    email: "user1@gmail.com",
    password: "user1_pw",
    address: "123 Main Street",
    phone: "3127895432",
    isGuest: false,
    isAdmin: false
  },
  {
    email: "user2@yahoo.com",
    password: null,
    address: "456 Birch Lane",
    phone: "1234567890",
    isGuest: true,
    isAdmin: false
  },{
    email: "adminUser2@yahoo.com",
    password: 'admin',
    address: "456 Birch Lane",
    phone: "1234567890",
    isGuest: false,
    isAdmin: true
  }
];

const products = [
  {
    name: "Blue Hickory",
    description:
      "Here’s our second time working with hickory! This gorgeous bowl has been an eye catcher from the moment we poured it, it’s beauty is just out of this world!",
    material: "Hickory",
    epoxyColor: "blue",
    price: 200.0,
    category: "Bowl",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Jewelry box",
    description:
      "Get your own custom stained box, the perfect gift idea for any event you're attending!",
    material: "Poplar",
    epoxyColor: "wax",
    price: 20.0,
    category: "Box",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
    featured: true,
    quantity: 2,
  },
  {
    name: "Hickory bowl",
    description:
      "Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!",
    material: "Hickory",
    epoxyColor: "wax",
    price: 30.0,
    category: "Bowl",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Hickory bowl",
    description:
      "Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!",
    material: "Hickory",
    epoxyColor: "wax",
    price: 30.0,
    category: "Bowl",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Hickory bowl",
    description:
      "Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!",
    material: "Hickory",
    epoxyColor: "wax",
    price: 30.0,
    category: "Bowl",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Cutting board",
    description:
      "Is it a beautifully crafted cutting board or an one-of-a-kind charcuterie board?? That’s up to you! Let us know down below your thoughts and how you personally would use this in your home!",
    material: "Spalted Oak",
    epoxyColor: "wax",
    price: 75.0,
    category: "Cutting board",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Set bowl",
    description: "Check out this gorgeous 3-piece spalted oak bowl set",
    material: "Spalted Oak",
    epoxyColor: "wax",
    price: 125.0,
    category: "Bowl set",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
  },
  {
    name: "Blue Goblet",
    description:
      "Here’s one of our successful experiments and first attempt at making drink wear, a black walnut and resin goblet this is our first time ever creating something like this!",
    material: "Spalted Oak",
    epoxyColor: "blue",
    price: 45.0,
    category: "Goblet",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
  },
  {
    name: "Oak vase",
    description:
      "Here’s a gorgeous spalted oak vase, or candle holder, whatever you decide!",
    material: "Spalted Oak",
    epoxyColor: "wax",
    price: 50.0,
    category: "Vase",
    image:
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    customizable: true,
  },
];

async function seed() {
  try {
    await db.sync({ force: true });

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      })
    );
    await Promise.all(
      orderProducts.map((orderProd) => {
        return OrderProduct.create(orderProd);
      })
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = seed;
if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error(err);
      db.close();
    });
}
