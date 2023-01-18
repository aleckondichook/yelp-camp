const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 50;
        const camp = new Campground ({
          author: '62151566284e078dd38c9b67',
          location: `${cities[random1000].city}, ${cities[random1000].state}`,
          title: `${sample(descriptors)} ${sample(places)}`,
          description: 'A millionaire Im a Young Money millionaire, tougher than Nigerian hair My criteria compared to your career just isnt fair Im a venereal disease like a menstrual bleed Through the pencil I leak on the sheet of the tablet in my mind Cause I dont write shit cause I aint got time Cause my seconds, minutes, hours go to the almighty dollar And the almighty power of that ch-cha-cha-chopper Sister, brother, son, daughter, father, mother-fuck a copper Got the Maserati dancing on the bridge, pussy popping Tell the coppers ha-ha-ha-ha, you cant catch em, you cant stop em I go by them goon rules, if you cant beat em then you pop em, you cant man em then you mop em, you cant stand em then you drop em You pop em cause we pop em like Orville Redenbacher',
          price,
          geometry: { 
            type: "Point", 
            coordinates: [
              cities[random1000].longitude, 
              cities[random1000].latitude,
            ]
          },
          images: [
            {
              url: 'https://res.cloudinary.com/dhqgl67ws/image/upload/v1645654575/yelpcamp/szyzlagtix9npo4gfzjv.jpg',
              filename: 'yelpcamp/szyzlagtix9npo4gfzjv',
            },
            {
              url: 'https://res.cloudinary.com/dhqgl67ws/image/upload/v1645654575/yelpcamp/feuu5aw4neqmfzppjgkb.png',
              filename: 'yelpcamp/feuu5aw4neqmfzppjgkb',
            },
            {
              url: 'https://res.cloudinary.com/dhqgl67ws/image/upload/v1645654575/yelpcamp/zq5it4srohf51ggnrzlr.jpg',
              filename: 'yelpcamp/zq5it4srohf51ggnrzlr',
            }
          ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})