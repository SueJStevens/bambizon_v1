-- Green Grocery --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(1, 'Grass', 'Luscious Dark Green Fescue', 10.82, 54, 'Bale', 0, null, 'Sue Stevens'),
(1, 'Bur Oak Acorn', 'High quality Quercus Macrocarpa, Minimum 1.5 inches long', 9.61, 29, 'each', 2428, null, 'Sue Stevens'),
(1, 'Clover, 4 Leaf Variety', 'Crimson with magic properties.  Shipped overnight from the Gaelic town Seamrog.  Sold in packages of 4', 23.58, 100, 'package', 587, null, 'Sue Stevens'),
(1, 'White Satin Carrot', 'Non-GMO perfectly cylindrical quick growing.  Sweet variety.', 13.88, 0, 'bunch', 8788, null, 'Sue Stevens'),
(1, 'Lavender Honey', 'Light, refreshing, sweet.  Perfect for spring or Summer.  Use this delicious floral treat in everything.', 8.97, 57, 'pot', 386, null, 'Sue Stevens');

-- spirits --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(2, 'DandyLion Wine', 'Sunshine-filled liqueor made from beautiful large dandelions grown at the base of Splash Mountain in Critter Country', 25.04, 19, 'Chopine', 1334, null, 'Sue Stevens'),
(2, 'Giggle Water', 'Clear, Fresh, Pure.', 15.83, 57, 'glass', 2112, null, 'Sue Stevens'),
(2, 'Antifogmatic', "a fine liquor to counteract the effect of fog.  Will clear a man\'s throat of the cobwebs.", 7.89, 11, 'nip', 2562, null, 'Sue Stevens');

-- media --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(3, 'The Day the Crayons Quit', 'The hilarious, colorful #1 New York Times bestselling phenomenon.', 22.12, 60, 'each', 7052, null, 'Sue Stevens'),
(3, 'Have You Ever Put Butter on a Pop Tart?', 'Pensive smash hit by Griffin and Quagmire', 17.65, 33, 'album', 3957, null, 'Sue Stevens');

-- furnishings --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(4, 'Pineapple House', 'Waterproof underwater hideout.  Made of non-toxic, fish-safe materials and colors.', 1758.69, 96, 'each', 9907, null, 'Cherry Yewwand'),
(4, 'Stone Couch', 'No more plastic! or vinyl, or PVC.  Comes in 7 comfortable seating arrangements Mrs. Flinstone will love!.'  , 2761.37, 48, 'piece', 9788, null, 'Apple Catsprite'),
(4, 'Manual Typewriter', 'Blue. Replica based on typewriter owned by Snoopy.  Comes complete with paper and partially typed novel.', 14.11, 8, 'download', 8158, null, 'Ember Rainbowfrost');

-- seasonal --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(5, 'Gingerbread Deer Costume, Small', 'Classic Christmas fashion statement  Step-in jumpsuit decorated just like a much-loved gingerbread man holiday cookie.  This jolly seasonal outfit is guaranteed to turn heads at any hoiday function.', 20.36, 2, 'each', 2582, null, 'Marzipan Snowtrifle'),
(5, 'Octopus with Christmas Decorations', 'Ever wish you had an extra hand or two at christmastime?  Our super multi-tasking octopus makes good use of those extra arms to wrap a festive gift and more!', 987.65, 8, 'each', 3452, 'pershible', 'Hazelnut Sugarsocks');
