/* Carmen Johnson
   MiU Project 3
   9/13/2012
*/


var tent = {
	category: "shelter",
	name: "Tent",
	quantity: 1,
	idno: 0,
	date: "23-06-2012",
	comments: "A Big Enough One",
	important: true
};

var sleepingBag = {
	category: "bedding",
	name: "Sleeping Bag",
	quantity: 1,
	idno: 1,
	date: "23-06-2012",
	comments: "A Big Enough One",
	important: true
};

var oven = {
	category: "cooking",
	name: "Oven",
	quantity: 1,
	idno: 2,
	date: "23-06-2012",
	comments: "Oven Fun!",
	important: false
};

var boots = {
	category: "clothing",
	name: "Boots",
	quantity: 2,
	idno: 3,
	date: "23-06-2012",
	comments: "For the odd hiking mood",
	important: false
};

var bandages = {
	category: "firstaid",
	name: "Bandages",
	quantity: 10,
	idno: 4,
	date: "23-06-2012",
	comments: "10 should be enough",
	important: true
};

var mat = {
	category: "shelter",
	name: "Mat",
	quantity: 2,
	idno: 5,
	date: "23-06-2012",
	comments: "Two should be enough",
	important: true
};

var sheets = {
	category: "bedding",
	name: "Sheets",
	quantity: 2,
	idno: 6,
	date: "23-06-2012",
	comments: "Two for two mats :)",
	important: true
};

var canOpener = {
	category: "cooking",
	name: "Can Opener",
	quantity: 1,
	idno: 7,
	date: "23-06-2012",
	comments: "For the bottles!",
	important: false
};

var pants = {
	category: "clothing",
	name: "Pants",
	quantity: 2,
	idno: 8,
	date: "23-06-2012",
	comments: "Blue and black",
	important: false
};

var antiseptic = {
	category: "firstaid",
	name: "Antiseptic",
	quantity: 1,
	idno: 9,
	date: "23-06-2012",
	comments: "For cuts and wounds",
	important: true
};

var groundTarp = {
	category: "shelter",
	name: "Ground Tarp",
	quantity: 1,
	idno: 10,
	date: "23-06-2012",
	comments: "A big enough one",
	important: true
};

var blankets = {
	category: "bedding",
	name: "Blankets",
	quantity: 2,
	idno: 11,
	date: "23-06-2012",
	comments: "Two for us again :)",
	important: true
};

var dishPan = {
	category: "cooking",
	name: "Dish Pan",
	quantity: 1,
	idno: 12,
	date: "23-06-2012",
	comments: "Frying!",
	important: false
};

var shirts = {
	category: "clothing",
	name: "Shirt",
	quantity: 2,
	idno: 13,
	date: "23-06-2012",
	comments: "Light colored shirts",
	important: false
};

var cotton = {
	category: "firstaid",
	name: "Cotton",
	quantity: 1,
	idno: 14,
	date: "23-06-2012",
	comments: "A roll should be enough",
	important: true
};

var shade = {
	category: "shelter",
	name: "Shade",
	quantity: 1,
	idno: 15,
	date: "23-06-2012",
	comments: "A big enough one",
	important: true
};

var pillows = {
	category: "bedding",
	name: "Pillows",
	quantity: 2,
	idno: 16,
	date: "23-06-2012",
	comments: "Two for us lol:)",
	important: true
};

var towels = {
	category: "cooking",
	name: "Towels",
	quantity: 2,
	idno: 17,
	date: "24-06-2012",
	comments: "No dirty hands!",
	important: false
};

var belts = {
	category: "clothing",
	name: "Belts",
	quantity: 2,
	idno: 18,
	date: "25-06-2012",
	comments: "Hold the pants tight",
	important: false
};

var tweezers = {
	category: "firstaid",
	name: "Tweezers",
	quantity: 1,
	idno: 19,
	date: "26-06-2012",
	comments: "For handling",
	important: true
};

var knife = {
	category: "cooking",
	name: "Knife",
	quantity: 1,
	idno: 20,
	date: "27-06-2012",
	comments: "Prepare the food",
	important: false
};

var soapBar = {
	category: "firstaid",
	name: "Bar of Soap",
	quantity: 2,
	idno: 21,
	date: "28-06-2012",
	comments: "Got to stay clean",
	important: true
};

var cannedSoup = {
	category: "cooking",
	name: "Canned Soup",
	quantity: 6,
	idno: 22,
	date: "29-06-2012",
	comments: "You got to eat, right? :)",
	important: true
};

var jsonObject = JSON.stringify([
	tent,
	sleepingBag,
	oven,
	boots,
	bandages,
	mat,
	sheets,
	canOpener,
	pants,
	antiseptic,
	groundTarp,
	blankets,
	dishPan,
	shirts,
	cotton,
	shade,
	pillows,
	towels,
	belts,
	tweezers,
	knife,
	soapBar,
	cannedSoup
]);