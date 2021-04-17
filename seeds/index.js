const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6070cd26264fe617504e2177',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            price,
            geometry : {
                type: 'Point',
                coordinates: [
                    [cities[random1000].longitude],
                    [cities[random1000].latitude]
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dweqyq91t/image/upload/v1618485163/YelpCamp/photo-1426604966848-d7adac402bff_zmfpyt.jpg',
                    filename: 'YelpCamp/nwxkkne0nwhv1yjqobsd'
                  },
                  {
                    url: 'https://res.cloudinary.com/dweqyq91t/image/upload/v1618485159/YelpCamp/photo-1588392382834-a891154bca4d_skt9p1.jpg',
                    filename: 'YelpCamp/tpzssj4zf5oggxoxkhs7'
                  }
            ]
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});