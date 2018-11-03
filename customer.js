/*Environment Variables & NPM Packages
-------------------------------------------------------------------------------
*/
//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//Add other node packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalkPipe = require('chalk-pipe');
const { table, getBorderCharacters } = require('table');

//MySQL Database Connection
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

//global variables
var prodIDToBuy = 0;
var qtyToBuy = 0;

/*prompt users with two messages.  
1) ask for ID of the product they would like to buy
2) ask how many units of the product they would like to buy
*/

var questions = [
  {
    type: 'input',
    name: 'productID',
    message: "Enter ID for the Product you wish to purchase:",
    validate: function (value) {
      var n = parseInt(value);
      if ((Number.isInteger(n)) && (n > 0) && (value % 1 === 0)) {
        return true;
      }
      return (chalkPipe('red.bold')('Please enter a valid Product ID.  ProductID will be a number.'));
    }

  },

  {
    type: 'input',
    name: 'qtyToBuy',
    message: "Enter the quantity you wish to purchase:",
    validate: function (value) {
      var n = parseInt(value);
      if ((Number.isInteger(n)) && (n > 0) && (value % 1 === 0)) {
        return true;
      }
      return (chalkPipe('red.bold')('Please enter a valid Quantity.  Quantities must be a whole number.'));
    }
  }

];  //end questions

// function which prompts the user for what action they should take
function start() {
  //Display to user all items available for sale
  readProducts()
}

function readProducts() {
  /* These variables are required by the NPM Tables library */
  let config,
    data,
    output;

  /* Create array to hold table rows. but we can use the data variable created needed by the NPM Table library 
   * It is an array in an array.  The first row is the header and it is predefined/hard-coded here.
   * Also data is required by  
  /*/
  //data = [['Product ID', 'Product Name', 'Price']];
    data = [['ID', 'Department', 'Product Name', 'Product Description', 'Price' ]];

  /* Configure table 
   * This configuration allows us to wrap text in each cell as well as truncate long data.
  */
  config = {
    border: getBorderCharacters(`void`),
    columns: {
      0: {
        width: 3
      },
      2: {
        width: 25,
        truncate: 50,
        wrapWord: true
      },
      3: {
        width: 50,
        truncate: 80,
        wrapWord: true
      }
    }
  };
  /* Create connection string to mySQL Database to return list of products */
    connection.query(
      "SELECT `productID`, `departmentName`, `productName`, CONCAT(`productDescription`, ' Sold by the ', `UoM`) as productDescription, format(`price`,2) as `price` FROM `products` INNER JOIN `departments` ON `products`.`departmentID` = `departments`.`departmentID` WHERE `products`.`deactivate` = ?",['0'], 
      function (err, res) {
      if (err) throw err;

      /* The data is return as an array of objects, but we need an array of rows in an array.
       * Loop thru the array of object (in this case call 'res')
       * Then we will push each row into it's own array.
       * This statement would give me a particular field from the query:  console.log("Product Name: " +res[i].productName);
      */
      for (var i = 0; i < res.length; i++) {
        //set up our empty row array
        var row = [];
        //loop through the array
        for (keys in res[i]) {
          //push each item in the array into the row array
          row.push(res[i][keys]);
        }
        //after the loop is finished, push each row array into the data array.
        data.push(row);
      }

      //populate the output variable and output as a table;
      output = table(data, config);

      console.log("List of all products available for sale:");
      console.log(output);
      //end connection 
      //connection.end();

      /* Start Questions via inquirer NPM package */

      //customer questions via inquirer
      inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
        prodIDToBuy = answers.productID;
        qtyToBuy = answers.qtyToBuy;

        //test to see if there is enough quantity to sell
        console.log("Please wait while I check our inventory:");
        checkInventory(prodIDToBuy);
      });

    });
}

function checkInventory(productID) {
  var stockQuantity = 0;
  console.log("Checking Inventory......");
  var sql = "SELECT `stockQuantity` FROM `products` WHERE `productID` = ? AND `deactivate` = ?"
  connection.query(sql, [productID, 0], function (err, res) {
    if (err) throw err;
    // Log results of the SELECT statement
    //console.log(res);
    for (var i = 0; i < res.length; i++) {
      stockQuantity = (res[i].stockQuantity);
    }
    //test for sufficient quantity
    if (parseInt(stockQuantity) >= qtyToBuy) {
      //run statement to reduce quantity in db
      reduceInventory(productID, qtyToBuy);
      //console.log ("Reducing Inventory" + stockQuantity + " - " + qtyToBuy);
    } else {
      console.log(chalkPipe('yellowBright.bold')("We do not have sufficient quantity on hand to meet your order.  Your order will not be placed."))
      //prevent order from going thru.
    }
    console.log("-----------------------------------");

    //end connection 
    //connection.end();

  });
}

function reduceInventory(productID, qty) {
  var sql = "UPDATE `products` SET `stockQuantity` = `stockQuantity`-" + qty + ", `productSales` = `productSales` + (" + qty + " * `price`), `recModBy` = ? WHERE `productID` = ? AND `deactivate` = ?"
  connection.query(sql, ['Joe Salesman', productID, 0], function (err, res) {
    if (err) throw err;
    //console.log("Your Order has been placed");
    orderCost(productID, qty);
    console.log("-----------------------------------");
    //end connection 
    connection.end();
  });
}

function orderCost(productID, qty) {
  totalCost = 0;
  console.log("Getting the cost of your purchase ......");
  var sql = "SELECT `price` * " + qty + " as `totalCost` FROM `products` WHERE `productID` = ? AND `deactivate` = ?"
  //console.log(sql);
  connection.query(sql, [productID, 0], function (err, res) {
    if (err) throw err;
    // Log results of the SELECT statement
    //console.log(res);
    for (var i = 0; i < res.length; i++) {
      totalCost = (res[i].totalCost);
    }
    console.log(chalkPipe('yellow')("Your Order has been placed.  The Total Cost of your purchase is: $" + totalCost));
    //end connection 
    //connection.end();

  });
}