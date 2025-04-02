const mongoose = require("../config/db");
const Restaurants = require("../models/restos");

const seedRestaurants = async () => {
    try {
        await Restaurants.insertMany([
            {
                name: "Denny's",
                rating: 5,
                description: "Denny's is America's diner. This is where guests have come for over 60 years now to sit back, relax and enjoy delicious, hearty meals 24/7, every day of the year. From breakfast anytime to satisfying lunches and dinners, if you're in the mood for it, chances are we're serving it. Denny's is always open, always welcoming and always serving up hearty diner food along with a mug of fresh hot coffee. So come on in anytime, park yourself in a comfortable booth, take a seat at the counter, whatever you want, because it won't take you long to understand why we're truly America's diner.",
                address: "63V5+67, Santa Rosa - Tagaytay Rd, Santa Rosa, 4026 Laguna",
                contact: "(+63)917 524 5058",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75247.44727712168!2d121.01528343363799!3d14.247009319117568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d3e70a27b71%3A0xa4be9854da716ae!2sDenny's!5e1!3m2!1sen!2sph!4v1742411352097!5m2!1sen!2sph",
                cuisine: "American Cuisine",
                coverPage: "img/Denny's/IMG_3.png",
                restoPhotos: ["/img/Denny's/IMG_1.jpg", "/img/Denny's/IMG_2.png", "/img/Denny's/IMG_3.png", "/img/Denny's/IMG_4.png"]
            },
            {
                name: "Nono's",
                rating: 5,
                description: "Nono's offers a delightful dining experience with a menu that elevates favorite comfort dishes to new heights. Their offerings range from classic Western staples to beloved local flavors, each thoughtfully crafted to balance tradition and innovation. The in-store bakery is a haven for those who cherish freshly baked delights, from buttery croissants to warm cookies.",
                address: "Santa Rosa - Tagaytay Rd G/F Solenad 3, Building E, Nuvali, Santa Rosa, Luzon Philippines",
                contact: "(+63)917 524 5058",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61876.44007035736!2d120.99141973124998!3d14.237027399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d5797d76b3b%3A0x2e8894fb1f0f2f2d!2sNono's!5e0!3m2!1sen!2sph!4v1742448553938!5m2!1sen!2sph",
                cuisine: "Dessert",
                coverPage: "img/Nono_s/nono3.jpg"
            },
            {
                name: "Kanin Club",
                rating: 5,
                description: "Kanin Club Established in 2005, Kanin Club is a pioneer in Filipino casual dining. The restaurant exudes a vibe reminiscent of a Filipino grandparent’s house, featuring capiz shell windows and wooden furnishings. Signature dishes include Crispy Dinuguan, a deep-fried crispy pork belly stewed in pig’s blood, and Crispy Beef Salad, shredded beef on a bed of fresh onions, cilantro, and tomatoes",
                address: "2 1. Paseo de Santa Rosa, Santa Rosa, Laguna., Santa Rosa, Luzon 4026 Philippines",
                contact: "(+63) 49 544 0332",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.0794612076907!2d121.06127527379586!3d14.248586885600652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d476cae0995%3A0x757ee3eed43e86be!2sKanin%20Club!5e0!3m2!1sen!2sph!4v1742448620006!5m2!1sen!2sph",
                cuisine: "Filipino Cuisine",
                coverPage: "img/Kanin Club/kanin 4.jpg"
            },
            {
                name: "Mama Lou's Italian Kitchen",
                rating: 5,
                description: "Mama Lou's Italian Kitchen serves Italian comfort food that makes diners feel as though they've been welcomed into an Italian home. The restaurant boasts a classic vintage-themed interior with warm colors and stylish decor. The menu features all-time favorite and classic Italian cuisine, including starters, soups, salads, homemade pasta, pizza, desserts, and a wide selection of beverages and wines.",
                address: "Solenad 2, NUVALI, Santa Rosa, Luzon Philippines",
                contact: "(+63) 49302 0752",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123746.45640804818!2d120.98144703243898!3d14.24874432704341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d1805436a0f%3A0xc599671828836962!2sMama%20Lou&#39;s%20Italian%20Kitchen%20-%20Ayala%20Malls%2C%20Solenad!5e0!3m2!1sen!2sph!4v1742448672819!5m2!1sen!2sph",
                cuisine: "Italian Cuisine",
                coverPage: "img/Mama Lou_s/mama2.jpg"
            },
            {
                name: "Ipponyari",
                rating: 5,
                description: "Ipponyari Japanese Restaurant offers authentic Japanese cuisine in a setting that transports diners to Japan. The restaurant has received positive reviews for its food, service, value, and atmosphere, making it a popular choice among locals and visitors alike.",
                address: "2nd Floor Piazza Bldg., Sta. Rosa Estate Tagaytay Road, Sta Rosa Laguna, Santa Rosa, Luzon 1634 Philippines",
                contact: "(+63) 49 541 1634",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.0673314058154!2d121.0602033737958!3d14.249294585583714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d473064774b%3A0x1c5811e56d7d3d8e!2sIpponyari%20Santa%20Rosa!5e0!3m2!1sen!2sph!4v1742448807799!5m2!1sen!2sph",
                cuisine: "Japanese Cuisine",
                coverPage: "img/Ippon/ippon3.jpg"
            },
            {
                name: "Crisostomo",
                rating: 5,
                description: "Crisostomo Restaurant offers a unique dining experience that combines traditional Filipino cuisine with a touch of modernity. The restaurant's ambiance reflects the rich history and culture of the Philippines, providing a memorable dining experience.",
                address: "Evolving Center Nuvali, Santa Rosa City, Santa Rosa, Luzon Philippines",
                contact: "(+63) 917 326 4762",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d494548.99510633777!2d120.70442237546733!3d14.446515777775566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d3d70665e0f%3A0x34932c2e9efa6b65!2sCrisostomo%20-%20Ayala%20Malls%20Solenad!5e0!3m2!1sen!2sph!4v1742449035380!5m2!1sen!2sph",
                cuisine: "Filipino Cuisine",
                coverPage: "img/Cris/cris3.jpg"
            },
            {
                name: "Shrimp Bucket",
                rating: 5,
                description: "Shrimp Bucket specializes in seafood, particularly shrimp dishes, offering a variety of flavors and preparations. The restaurant provides a casual dining atmosphere where seafood lovers can indulge in their favorite dishes.",
                address: "Tagaytay Road Solenad 3, Nuvali, Santa Rosa, Luzon Philippines",
                contact: "(+63) 49 544 4406",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.269719166469!2d121.0547560737956!3d14.237481985866312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7d22b10b5f0b%3A0x3a560b954270af0f!2sShrimp%20Bucket%20Nuvali!5e0!3m2!1sen!2sph!4v1742449075460!5m2!1sen!2sph",
                cuisine: "Italian Cuisine",
                coverPage: "img/Shrimp/shrimp3.jpg"
            },
            {
                name: "Pho Saigon",
                rating: 5,
                description: "Pho Saigon Vietnamese Restaurant brings authentic Vietnamese flavors to Santa Rosa. The menu features traditional Vietnamese dishes, providing a healthy and flavorful dining option for those seeking something different..",
                address: "Embarcadero Dr Unit 31 & 32 Paseo 6, Santa Rosa, Luzon Philippines",
                contact: "(+63) 995 132 8276",
                googleMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3867.0982229311244!2d121.06124067379577!3d14.247492185626836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd7dba552565b5%3A0x1e0cd0d0b189bfb1!2sPho%20Saigon%20Vietnamese%20Restaurant!5e0!3m2!1sen!2sph!4v1742449118119!5m2!1sen!2sph",
                cuisine: "Vietnamese Cuisine",
                coverPage: "img/Pho/pho4.jpg"
            }
        ]);

        console.log("Restaurants seeded successfully");
    }
    catch{
        console.error("Try seeding again");
    }
    finally{
        mongoose.connection.close();
    }
}

//seedRestaurants();