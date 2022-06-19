/* 
    Data Store 
*/

const fs = require('fs').promises;

let data = [
    {
        idx: 0,
        name: "Vegetables in Paprika Sauce with Spinach Rice",
        chef: "Sanjyot Keer",
        preptime: "45",
        type: "vegetarian",
        img: "http://localhost:8080/images/img-cover-0.png",
        preplist: [
            "Spinach 1 big bunch",
            "A pinch of salt",
            "Fresh mint leaves 1 tbsp",
            "Fresh coriander 1 tbsp",
            "Green chillies 2 nos.",
            "Ice cubes 1-2 nos.",
            "Butter 1 tbsp & oil 1 tsp",
            "Garlic 1 tbsp",
            "Red chilli flakes 1 tsp",
            "Cooked basmati rice (5 cups)",
            "Salt to taste",
            "Black pepper powder a pinch",
            "Lemon juice 1 tsp",
            "Oil 1 tsp",
            "Garlic 1 tbsp (chopped)",
            "Red chilli flakes 1 tsp",
            "Baby corn 1/3rd cup",
            "Carrot 1/3rd cup",
            "Zucchini 1/3rd cup",
            "Mushroom 1/3rd cup",
            "Mixed bell peppers 1/3rd cup",
            "Broccoli 1/3rd cup",
            "Salt & pepper to taste",
            "2 tbsp butter",
            "Refined flour (maida) 2 tbsp",
            "Milk 600 ml",
            "Paprika powder 1 tbsp (red chilli powder)",
            "Salt to taste",
            "Black pepper a pinch",
            "Nutmeg powder a pinch",
            "paneer 150 gm (cubes)"
        ],
        steps: [
            "Set water for boiling, add the cleaned and washed spinach leaves and blanch for few seconds, remove and immediately transfer to ice cold water. This process helps in retaining the bright green colour of spinach.",
            "Now, transfer the spinach in grinding jar, along with fresh mint leaves, coriander leaves, green chillies and few ice cubes, grind to a fine puree and keep aside.",
            "Set a wok on medium heat, add butter & oil, garlic and red chilli flakes, cook for 1-2 minutes on medium flame, now add the spinach puree and cook for 4-5 minutes.",
            "Now add the cooked rice, salt to taste, black pepper powder a pinch and lemon juice, stir and cook for 2-3 minutes, stir gently without breaking the rice grains. Spinach rice is ready, serve hot with hot paprika sauce.",
            "For sautéed veggies, set a wok on medium heat, add oil, garlic and red chilli flakes, cook for 2-3 minutes.",
            "Now, add baby corn & carrot and cook for 2-3 minutes on high flame, further add the remaining veggies, salt & pepper to taste, stir and cook for 2-3 minutes, sautéed veggies are ready, keep aside to be added later in the paprika sauce.",
            "For paprika sauce, set a sauce pan or wok on low heat, add butter and flour, mix and cook for 3-4 minutes, now add milk in 3-4 batches, make sure to whisk well while adding milk to avoid lump formation. Cook the sauce until its thick and creamy.",
            "Now add paprika powder, salt to taste, black pepper powder a pinch and nutmeg powder, mix well and cook for 1-2 minutes, further add the sautéed veggies and cook for 1-2 minutes, now add the paneer and mix gently.",
            "Paprika sauce with sautéed veggies and paneer is ready, serve hot with hot spinach rice."
        ]
    },
    {
        idx: 1,
        name: "Shrimp Scampi with Capellini Pasta",
        chef: "Gordon Ramsay",
        img: "http://localhost:8080/images/img-cover-1.png",
        preptime: "60",
        type: "non-vegetarian",
        preplist: [
            "8-12 shrimp, peeled and de-veined",
            "115g angelhair or capellini pasta",
            "2 tbsp extra virgin olive oil",
            "3 garlic cloves",
            "1 large shallot, diced finely",
            "2 tsp chili flakes",
            "2 lemons",
            "100ml white wine",
            "2 tbsp capers",
            "60g cherry tomatoes, halved",
            "100ml seafood stock",
            "55g butter, cubed",
            "Parmesan, for grating",
            "1 sprig of basil, picked",
            "Salt and fresh cracked black pepper, to taste"
        ],
        steps: [
            "Add water to a 4 quart sauce pot. Salt liberally, cover with a lid and bring to a boil.",
            "Heat a medium nonstick saute pan on medium heat with one tablespoon of olive oil.",
            "When hot, add the diced shallots and finely grate the garlic bulbs into the pan and saute for 2 minutes to soften them.",
            "Deglaze the pan with the white wine and cook until it is almost evaporated from the pan.",
            "Add the seafood stock, chili flakes, capers, cherry tomatoes and lemons (zested and juiced).",
            "When the sauce comes to a simmer, season the raw shrimp with salt and pepper and poach in the liquid for about 1 minute per side.",
            "Add the cubed butter to melt.",
            "Taste and season the sauce accordingly.",
            "Meanwhile, when the pot of water begins to boil, add the pasta and use tongs or a fork to gradually push it into the seasoned water as it starts to soften. Boil the pasta, stirring occasionally so it doesn’t stick together, for about 3-5 minutes, or until al dente.",
            "Strain the pasta and quickly add it to the pan with the scampi sauce and cooked shrimp. Toss the pasta in the sauce to coat evenly.",
            "Finally, tear the fresh basil leaves and toss into the pasta before plating.",
            "Plate the cooked pasta into a medium size bowl with some height. Garnish with a grating of Parmesan cheese."
        ]
    },
    {
        idx: 2,    
        name: "Korean Tofu and Leek Barbeque",
        chef: "Dohoon Lee",
        preptime: "60",
        type: "vegan",
        img: "http://localhost:8080/images/img-cover-2.png",
        preplist: [
            "1 (16 ounce) package firm tofu, cubed",
            "1 cup cored and quartered apples",
            "¼ cup soy sauce",
            "¼ cup sesame oil",
            "2 tablespoons maple syrup",
            "2 tablespoons gochujang (Korean hot pepper paste)",
            "1 tablespoon toasted sesame seeds",
            "8 skewers, or as needed",
            "1 leek, cut into thick wedges",
            "cooking spray",
            "1 tablespoon toasted sesame seeds"
        ],
        steps: [
            "Place tofu in a large bowl. Combine apples, soy sauce, sesame oil, maple syrup, hot pepper paste, and 1 tablespoon sesame seeds in a blender; puree until smooth. Pour marinade over tofu. Cover with plastic wrap and refrigerate 8 hours to overnight.",
            "Drain tofu and discard marinade. Thread tofu and leek pieces alternately onto skewers.",
            "Heat a grill pan over high heat and spray with cooking spray. Grill skewers until browned on all 4 sides, about 2 minutes per side. Sprinkle with sesame seeds."
        ]
    }
]

const dataStore = {};

dataStore.add = (obj) => {

    try {

        obj.idx = data.length;
        obj.img = null;
        data.push(obj);

        return { code: 201, msg: "Item added", idx: obj.idx};
        
    } catch (error) {

        return { code: 500, msg: "Could not add item"};

    }

}

dataStore.addThumbnail = async(obj) => {

    return new Promise(async(resolve) => {
        try {
            
            let fileName = `img-cover-${obj.idx}.${obj.format}`;
            await fs.writeFile(`./public/images/${fileName}`, obj.img, {encoding: 'base64'});
            data[obj.idx].img = `http://localhost:8080/images/${fileName}`;
            resolve({code: 201, url: data[obj.idx].img});
            
        } catch (error) {
            
            console.log(error);
            resolve({ code: 500, msg: "Could not add image"});
    
        }
    })

}

dataStore.get = () => {

    try {

        return {code: 200, data: data};

    } catch (error) {
        
        return { code: 500, msg: "Could not retrive data from data store"};

    }
    
}

dataStore.delete = (idx) => {

    try {

        data.splice(idx, 1);
        return {code: 200, msg: `Deleted item with idx ${idx}`};

    } catch (error) {
        
        return { code: 404, msg: "Could not delete item, please check the idx"};

    }

}

dataStore.init = async() => {
    
    console.log('\x1b[36mNinjaChefs API is starting...\x1b[0m');
    console.log('→ Clearing image data from previous session...');
    let files = await fs.readdir("./public/images");

    for (let file of files) {
        
        let idx = file.split("img-cover-")[1].split('.')[0];

        if (idx > 2) {
            await fs.unlink(`./public/images/${file}`);
            console.log(`\x1b[33m → [DELETED] ./public/images/${file}\x1b[0m`);
        }
    }

}

module.exports = dataStore;