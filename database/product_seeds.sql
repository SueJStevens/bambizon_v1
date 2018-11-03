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
(2, 'Nectarian', 'From the Lunar Geological Timescale, this is the beverage of choice for all 7 dwarfs', 15.17, 80, 'Ale Horn', 9467, null, 'Sue Stevens'),
(2, 'Half-seas Over', 'This beer has been around since the 19th century and has the benefits of getting the a man slightly soused before attempting to was romantic with a woman.', 17.22, 39, 'growler', 5439, null, 'Sue Stevens'),
(2, 'Antifogmatic', 'a fine liquor to counteract the effect of fog.  Will clear a man\'s throat of the cobwebs.', 7.89, 11, 'nip', 2562, null, 'Sue Stevens');

-- media --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(3, 'The Day the Crayons Quit', 'The hilarious, colorful #1 New York Times bestselling phenomenon.', 22.12, 60, 'each', 7052, null, 'Sue Stevens'),
(3, 'Ladybug Magazine', 'Ladybug magazine is for kids (baby goats) and offers enchanting stories and poems to read aloud that are just the right length.  Developed by Goldilocks, Inc.', 21.95, 98, '1-yr Subscription', 9647, null, 'Sue Stevens'),
(3, 'The Secret Life of Pets', 'The quiet life of a terrier named Max is upended when his owner takes in Duke, a stray whom Max instantly dislikes.', 22.16, 31, 'Streaming', 3422, null, 'Sue Stevens'),
(3, 'Candy Crush', 'free-to-play match-three puzzle video game.', 13.03, 22, 'download', 8738, null, 'Sue Stevens'),
(3, 'Have You Ever Put Butter on a Pop Tart?', 'Pensive smash hit by Griffin and Quagmire', 17.65, 33, 'album', 3957, null, 'Sue Stevens');

-- furnishings --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(4, 'Pineapple House', 'Waterproof underwater hideout.  Made of non-toxic, fish-safe materials and colors.', 1758.69, 96, 'each', 9907, null, 'Cherry Yewwand'),
(4, 'Stone Couch', 'No more plastic! or vinyl, or PVC.  Comes in 7 comfortable seating arrangements Mrs. Flinstone will love!.'  , 2761.37, 48, 'piece', 9788, null, 'Apple Catsprite'),
(4, 'Clam Shell Pet Bowl', 'Feed your pet in style!', 18.49, 77, 'each', 9417, null, 'Ash Windwasp'),
(4, 'Manual Typewriter', 'Blue. Replica based on typewriter owned by Snoopy.  Comes complete with paper and partially typed novel.', 14.11, 8, 'download', 8158, null, 'Ember Rainbowfrost'),
(4, 'Rosie Roomba', 'Rosie the housekeeping robot originally seen on The Jetsons makes a comback!', 233.03, 41, 'each', 4993, null, 'Ash Windwasp');

-- toys --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(5, 'Toy1', 'Toy Name 1', 1.99, 90, 'each', 1474, null, 'Emma Quince'),
(5, 'Toy2', 'Toy Name 2', 2.88, 35, 'each', 5065, null, 'Mark Anstey'),
(5, 'Toy3', 'Toy Name 3', 3.77, 72, 'each', 2799, null, 'Phoebe Hammond'),
(5, 'Toy4', 'Toy Name 4', 4.66, 53, 'each', 3511, null, 'Robbie Stevens'),
(5, 'Toy5', 'Toy Name 5', 5.55, 82, 'each', 2308, null, 'Gemma Denholm');

-- seasonal --
INSERT INTO `bambizon_db`.`products`
(`departmentID`, `productName`, `productDescription`, `price`, `stockQuantity`, `UoM`, `productSales`, `comments`, `recAddedBy`)
VALUES
(6, 'Holiday1', 'Holiday Item 1', 6.44, 38, 'each', 2582, null, 'Marzipan Snowtrifle'),
(6, 'Holiday2', 'Holiday Item 2', 7.33, 11, 'each', 3452, null, 'Hazelnut Sugarsocks'),
(6, 'Holiday3', 'Holiday Item 3', 8.22, 43, 'each', 5094, null, 'Nougat Greensparkles'),
(6, 'Holiday4', 'Holiday Item 4', 9.11, 14, 'each', 7085, null, 'Clove Snoozysleigh'),
(6, 'Holiday5', 'Holiday Item 5', 10.00, 6, 'each', 3194, null, 'Carol Ivyfluff');