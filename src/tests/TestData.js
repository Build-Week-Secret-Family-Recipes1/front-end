export const testRecipe0 = {
  id: 0,
  user_id: 0,
  title: 'Chocolate Chip Cookies',
  source: 'Grandma Ann',
  ingredients: [
    '2 1/4 c all-purpose flour',
    '1 1/4 tsp salt',
    '1 tsp baking soda',
    '1 c unsalted butter',
    '1 c white sugar',
    '1/2 c light brown sugar',
    '1 large egg',
    '2 tbsp milk',
    '1 1/4 tsp vanilla extract',
    '2 c chocolate chips'
  ],
  steps: [
    'Whisk flour, salt, and baking soda together in a bowl. In a separate bowl, cream the butter, white sugar, and brown sugar together until mixture is light and fluffy, 3 to 4 minutes. Add the egg, milk, and vanilla extract. Whisk liquids together in small areas around the bowl, then all together to avoid separation.',
    'Pour dry ingredients into the wet ingredients; stir until flour is thoroughly mixed in. Stir in the chocolate chips.',
    'Transfer dough to a resealable plastic bag. Refrigerate until dough is firm, at least 2 hours.',
    'Preheat oven to 375 degrees F (190 degrees C). Line baking sheet with parchment paper.',
    'Scoop out rounded tablespoons of dough and place on prepared baking sheet, leaving 4 inches of space between cookies (about 8 per sheet). Bake in preheated oven until cookies are golden brown, about 12 minutes. Slide parchment and cookies onto a cooling rack for a few minutes. Remove parchment and finish cooling the cookies on the rack.'
  ],
  tags: ['desert','cookies','sweet']
};

export const testRecipe1 = {
  id: 1,
  user_id: 0,
  title: 'Grilled Corn on the Cob',
  source: 'Uncle Joe',
  ingredients: ['6 ears corn', '6 tbsp butter', 'salt and pepper to taste'],
  steps: [
    'Preheat an outdoor grill for high heat and lightly oil grate.',
    'Peel back corn husks and remove silk. Place 1 tablespoon butter, salt and pepper on each piece of corn. Close husks.',
    'Wrap each ear of corn tightly in aluminum foil. Place on the prepared grill. Cook approximately 30 minutes, turning occasionally, until corn is tender.'
  ],
  tags: ['grill', 'summer', 'vegetarian', 'side dish']
};

export const testRecipe2 = {
  id: 2,
  user_id: 0,
  title: 'Lasagna',
  source: 'Aunt Kim',
  ingredients: [
    '1 lb Italian sausage',
    '1 lb ground beef',
    '1 c chopped onion',
    '4 cloves garlic',
    '16 oz tomato sauce',
    '14 oz crushed tomatoes',
    '14 oz Italian-style chrushed tomatoes',
    '12 oz tomato paste',
    '3 tbsp chopped fresh basil',
    '2 tbsp chopped fresh parsley',
    '2 tsp brown sugar',
    '1 tsp salt',
    '1 tsp Italian seasoning',
    '1/4 tsp black pepper',
    '1/2 tsp fennel seeds',
    '1/2 c grated parmesan cheese',
    '12 lasagna noodles',
    '1 egg',
    '15 oz ricotta cheese',
    '1/2 tsp salt',
    '16 oz shredded mozzarella cheese',
    '3/4 c grated parmesan cheese'
  ],
  steps: [
    'Brown sausage and ground beef with onion and garlic in a large Dutch oven or heavy pot over medium heat, cooking and stirring until meat is cooked through, 10 to 15 minutes. Drain and discard grease. Stir tomato sauce, crushed tomatoes, Italian-style crushed tomatoes, tomato paste, basil, 2 tablespoons parsley, brown sugar, salt, Italian seasoning, black pepper, fennel seeds, and 1/2 cup Parmesan cheese into meat mixture. Bring to a boil, reduce heat to low, and simmer sauce for at least 1 hour (up to 6 for best flavor). Stir occasionally.',
    'Place lasagna noodles into a deep bowl and cover with very hot tap water; let soak for 30 minutes.',
    'Beat egg in a bowl and stir ricotta cheese, 2 tablespoons parsley, 1/2 teaspoon salt, and nutmeg into egg until thoroughly combined.',
    'Preheat oven to 375 degrees F (190 degrees C).',
    'Cover bottom of a 9x13-inch baking dish with 1 cup sauce. Layer 4 soaked lasagna noodles, 1/3 of the ricotta cheese mixture, 1/3 of the shredded mozzarella cheese, and 1/4 cup Parmesan cheese in the dish. Repeat layers twice more, ending with mozzarella and Parmesan cheeses. Cover dish with aluminum foil.',
    'Bake until lasagna noodles are tender and casserole is bubbling, about 50 minutes. Remove foil and bake until cheese topping is lightly browned, 15 to 20 more minutes. Let stand 15 minutes before serving.'
  ],
  tags: ['pasta','Italian']
}

export const testList = [testRecipe0, testRecipe1, testRecipe2];
