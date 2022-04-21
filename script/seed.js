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
  },
  {
    email: "user2@yahoo.com",
    password: null,
    address: "456 Birch Lane",
    phone: "1234567890",
    isGuest: true,
  },
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
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/273431156_149286724144871_6095664010248031855_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=cGgOe3DMUpYAX9o12dL&_nc_ht=scontent-mia3-1.xx&oh=00_AT8tDwju0Yew_hsG5LWAOA-QA5CnSXlyJB2hvgi7GGCX_w&oe=6264AB25",
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
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/240654500_105370595203151_6837024417767155534_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=vbJ-aoTf1gIAX-F_XfG&_nc_ht=scontent-mia3-1.xx&oh=00_AT8Ew2MM0lsO1w1Xb0x6hmZUHGDSEg-oMhvIeykjVg5h7w&oe=6263C73E",
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Blue Goblet",
    description:
      "Here’s one of our successful experiments and first attempt at making drink wear, a black walnut and resin goblet this is our first time ever creating something like this!",
    material: "Spalted Oak",
    epoxyColor: "Blue",
    price: 45.0,
    category: "Goblet",
    image:
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/243994121_119701373770073_5086306983958367689_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=5LWAZCMjoyQAX-wcnUJ&_nc_oc=AQlzmLGPsPI5h3ZK69ps9_3xPhnvhxbYzYRFOjJUwRJ75EnzdSuSwVaWcQGR1trTkXY&_nc_ht=scontent-mia3-1.xx&oh=00_AT_sJTJGSdAjj_rQsWfts_AZZ_GLA559_1zDf7Dsb89wBA&oe=6264153B",
    customizable: true,
    featured: false,
    quantity: 1,
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
      "https://scontent-mia3-1.xx.fbcdn.net/v/t39.30808-6/274459367_153108110429399_4100634341468502328_n.jpg?stp=dst-jpg_p960x960&_nc_cat=100&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=TDz6VdtXxXYAX83y0N7&_nc_ht=scontent-mia3-1.xx&oh=00_AT9tNFlR1DULmIT4eKn0NWZtAnWer_3PnBcBQYsBkwZ3-g&oe=626485E3",
    customizable: true,
    featured: false,
    quantity: 1,
  },
];

async function seed() {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );
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
