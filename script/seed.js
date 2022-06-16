// const db = require("../server/db/db");
// const Product = require("../server/db/models/Product");
const {
  db,
  Product,
  Order,
  User,
  OrderProduct,
  Review,
} = require("../server/db/models");

const orderProducts = [
  {
    orderId: 1,
    productId: 1,
    customization: null,
    gift: false,
    price: 5,
  },
  {
    orderId: 1,
    productId: 2,
    customization: "Initials TEK",
    gift: true,
    price: 200,
  },
  {
    orderId: 2,
    productId: 2,
    customization: null,
    gift: false,
    price: 50,
  },
];

const orders = [
  {
    status: "Processing",
    userId: 1,
    shipping: 5.99,
    tax: 2.5,
  },
  {
    status: "Completed",
    userId: 2,
    shipping: 0,
    tax: 1.25,
  },
];

const users = [
  {
    email: "user1@gmail.com",
    password: "user1_pw",
    address: "123 Main Street",
    phone: "3127895432",
    isGuest: false,
    isAdmin: false,
  },
  {
    email: "user2@yahoo.com",
    password: null,
    address: "456 Birch Lane",
    phone: "1234567890",
    isGuest: true,
    isAdmin: false,
  },
  {
    email: "adminUser2@yahoo.com",
    password: "admin",
    address: "456 Birch Lane",
    phone: "1234567890",
    isGuest: false,
    isAdmin: true,
  },
];

const reviews = [
  {
    name: "Angel",
    description:
      "Great product. It definitely exceeded ALL expectations, absolutely perfect.",
  },
  {
    name: "Alex",
    description: "Excellent bowls, excellent lids.",
  },
];

const products = [
  {
    name: "Hickory bowl",
    description:
      "Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!",
    material: "Hickory",
    epoxyColor: "wax",
    price: 30.0,
    category: "Bowl",
    image: [
      "/photos/firsthickorybowl.jpeg",
      "/photos/HickoryBowl2.png",
      "/photos/HickoryBowl3.png",
      "/photos/HickoryBowl4.png",
      "/photos/HickoryBowl5.png",
      "/photos/HickoryBowl6.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Blue Hickory",
    description:
      "Here’s our second time working with hickory! This gorgeous bowl has been an eye catcher from the moment we poured it. It’s beauty is just out of this world!",
    material: "Hickory",
    epoxyColor: "blue",
    price: 200.0,
    category: "Bowl",
    image: [
      "/photos/BlueHickoryBowl.jpeg",
      "/photos/BlueHickory2.png",
      "/photos/BlueHickory3.png",
      "/photos/BlueHickory4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Pecan and Epoxy Bowl",
    description:
      "Here’s another of our gorgeous new pecan bowls, look at all that fine epoxy detailing!",
    material: "Hickory",
    epoxyColor: "wax",
    price: 30.0,
    category: "Bowl",
    image: [
      "/photos/pecanAndEpoxyBowl.jpeg",
      "/photos/PecanEpoxy2.png",
      "/photos/PecanEpoxy3.png",
      "/photos/PecanEpoxy4.png",
    ],
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Oak & Epoxy Bowl",
    description:
      "Our first time working with hickory, and it definitely won’t be our last! We hope you love this small beautiful bowl, perfect for whatever you need, as much as we do!",
    material: "Hickory",
    epoxyColor: "blue",
    price: 200.0,
    category: "Bowl",
    image: [
      "/photos/liveoakandepoxybowl.jpg",
      "/photos/OakEpoxyBowl2.png",
      "/photos/OakEpoxyBowl3.png",
      "/photos/OakEpoxyBowl4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Poison Ivy Bowl",
    description:
      "Check out our poison ivy bowl 🌿 we absolutely loved making it and have been dying to share it with you all! ",
    material: "Poplar",
    epoxyColor: "green",
    price: 80.0,
    category: "Bowl",
    image: [
      "/photos/PoisonIvyBowl.png",
      "/photos/PoisonIvyBowl2.png",
      "/photos/PoisonIvyBowl3.png",
      "/photos/PoisonIvyBowl4.png",
    ],
    customizable: false,
    featured: true,
    quantity: 1,
  },
  {
    name: "Live Oak & Epoxy Bowl",
    description:
      "'Someday you will look back at this work, laugh nervously and change the subject.' -Unknown \nThe first attempt at anything is a learning experience, and your bound to see improvement from the next go around. \nCheck out my first bowl, and stay tuned to see if I improve any on my next piece!",
    material: "Live Oak",
    epoxyColor: "wax",
    price: 100.0,
    category: "Bowl",
    image: [
      "/photos/LiveOakGreenEpoxy.png",
      "/photos/LiveOakGreenEpoxy2.png",
      "/photos/LiveOakGreenEpoxy3.png",
      "/photos/LiveOakGreenEpoxy4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Olive Tree Bowl",
    description:
      "Here’s our only olive tree bowl! With such an organic and large shape to it, this piece definitely stands out. Those live edge parts really draw the eye and show how beautiful this bowl really is!",
    material: "Olive Tree",
    epoxyColor: "wax",
    price: 220.0,
    category: "Bowl",
    image: [
      "/photos/olivetreebowl.jpeg",
      "/photos/OliveTreeBowlLeft.png",
      "/photos/OliveTreeBowlFlat.png",
      "/photos/OliveTreeBowlBottom.png",
    ],
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Poplar Epoxy Bowl",
    description:
      "Here’s a gorgeous poplar epoxy bowl, perfect for holding whatever you need!",
    material: "Poplar",
    epoxyColor: "wax",
    price: 50.0,
    category: "Bowl",
    image: [
      "/photos/poplarEpoxyBowl.jpeg",
      "/photos/PoplarEpoxyBowl2.png",
      "/photos/PoplarEpoxyBowl3.png",
      "/photos/PoplarEpoxyBowl4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Azalea Root Bowl",
    description:
      "One of our favorites! This azalea bush root was locally dug up and donated by one of our supporters! We are so grateful to have been gifted this to create this beautiful artwork. Covered in emerald green epoxy, it is our biggest bowl yet! ",
    material: "Poplar",
    epoxyColor: "green",
    price: 150.0,
    category: "Bowl",
    image: [
      "/photos/azaleaRootBowl.jpeg",
      "/photos/AzaleaRoot2.png",
      "/photos/AzaleaRoot3.png",
      "/photos/AzaleaRoot4.png",
    ],
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Cutting board",
    description:
      "Is it a beautifully crafted cutting board or an one-of-a-kind charcuterie board?? That’s up to you!",
    material: "Spalted Oak",
    epoxyColor: "wax",
    price: 75.0,
    category: "Cutting board",
    image: [
      "/photos/oakCuttingBoard.jpeg",
      "/photos/CB2.png",
      "/photos/CB3.png",
      "/photos/CB4.png",
    ],
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
    image: [
      "https://target.scene7.com/is/image/Target/GUEST_94be93de-388f-4fcb-abb0-e62377243ba1?wid=488&hei=488&fmt=pjpeg",
    ],
    customizable: true,
  },
  {
    name: "Blue Goblet",
    description:
      "Here’s one of our successful experiments and first attempt at making drink wear, a black walnut and resin goblet this is our first time ever creating something like this!",
    material: "Walnut",
    epoxyColor: "blue",
    price: 45.0,
    category: "Goblet",
    image: [
      "/photos/BlueGoblet.jpeg",
      "/photos/BlueGoblet2.png",
      "/photos/BlueGoblet3.png",
      "/photos/BlueGoblet4.png",
    ],
    customizable: false,
  },
  {
    name: "Spaulted Oak Vase",
    description:
      "Here’s a gorgeous spalted oak vase, or candle holder, whatever you decide!",
    material: "Spalted Oak",
    epoxyColor: "wax",
    price: 50.0,
    category: "Vase",
    image: [
      "/photos/OakVase.jpeg",
      "/photos/SpaultedOakVase2.png",
      "/photos/SpaultedOakVase3.png",
      "/photos/SpaultedOakVase6.png",
    ],
    customizable: true,
  },
  {
    name: "Pecan and Epoxy Bowl",
    description:
      "Here is our newest addition, this jaw dropping pecan and epoxy resin bowl. Check out the fine, beautiful white detailing in the wood grain!",
    material: "Pecan",
    epoxyColor: "wax",
    price: 100.0,
    category: "Bowl",
    image: [
      "/photos/pecanepoxybowl2.jpeg",
      "/photos/PE2.png",
      "/photos/PE3.png",
      "/photos/PE4.png",
      "/photos/PE5.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Spaulted Pecan Bowl",
    description:
      "We loved making this very uniquely shaped bowl, and we hope you love this large square shaped spalted pecan just as much!",
    material: "Spaulted Pecan",
    epoxyColor: "wax",
    price: 250.0,
    category: "Bowl",
    image: [
      "/photos/spaultedpecanbowl.jpeg",
      "/photos/spaultedBowl2.png",
      "/photos/spaultedBowl3.png",
      "/photos/spaultedBowl4.png",
    ],
    customizable: true,
    featured: false,
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
    image: [
      "/photos/jewelrybox.jpeg",
      "/photos/JB2.png",
      "/photos/JB3.png",
      "/photos/JB4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 2,
  },
  {
    name: "Spaulted Oak Bowl",
    description:
      "This beautifully handcrafted piece is more than meets the eye. This one taught us the very important lesson of working with fully dried out wood and what happens when you don’t. We’re learning everyday and loving every minute of it.",
    material: "Spaulted Oak",
    epoxyColor: "blue",
    price: 50.0,
    category: "Bowl",
    image: [
      "/photos/spaultedOakAndEpoxyResinBowl.jpeg",
      "/photos/spaultedOakBowl2.png",
      "/photos/spaultedOakBowl3.png",
      "/photos/spaultedOakBowl4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Black Walnut Bowl",
    description:
      "Check out our newest! A very unique black walnut bowl, differing in appearance from the black walnut goblets we previously made, this bowl was made from the heart wood which explains the beautiful dark, rich color.",
    material: "Black Walnut",
    epoxyColor: "wax",
    price: 55.0,
    category: "Bowl",
    image: [
      "/photos/BlackWalnutBowl.jpeg",
      "/photos/BlackWalnut2.png",
      "/photos/BlackWalnut3.png",
      "/photos/BlackWalnut4.png",
    ],
    customizable: true,
    featured: true,
    quantity: 1,
  },
  {
    name: "Pecan Bowl",
    description:
      " 'There is no scrap wood, just pieces not yet used.' -Unknown \nAnother beautiful pecan bowl handcrafted from Bell’s Custom Worx!",
    material: "Pecan",
    epoxyColor: "wax",
    price: 35.0,
    category: "Bowl",
    image: [
      "/photos/pecanBowl.jpeg",
      "/photos/PecanBowl2.png",
      "/photos/PecanBowl3.png",
      "/photos/PecanBowl4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Bradford Pear Board",
    description:
      "This Bradford pear cutting board is a unique piece for your home!",
    material: "Spalted Oak",
    epoxyColor: "wax",
    price: 75.0,
    category: "Cutting board",
    image: [
      "/photos/BradfordPearCuttingBoard.jpeg",
      "/photos/BradfordCB2.png",
      "/photos/BradfordCB3.png",
      "/photos/BradfordCB4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
  },
  {
    name: "Cedar & Epoxy Bowl",
    description:
      " 'There are no mistakes in woodworking until you run out of wood.' -Unknown \nHere’s one of my personal favorite pieces, cedar and epoxy bowl",
    material: "Cedar",
    epoxyColor: "wax",
    price: 35.0,
    category: "Bowl",
    image: [
      "/photos/CedarAndEpoxyBowl.jpeg",
      "/photos/CedarEpoxyBowl2.png",
      "/photos/CedarEpoxyBowl3.png",
      "/photos/CedarEpoxyBowl4.png",
    ],
    customizable: true,
    featured: false,
    quantity: 1,
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
    await Promise.all(
      reviews.map((review) => {
        return Review.create(review);
      })
    );
    // await Promise.all(
    //   reviews.map((review) => {
    //     return Review.create(review);
    //   })
    // );
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
