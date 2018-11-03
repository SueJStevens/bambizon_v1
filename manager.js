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
/*END Environment Variables & NPM Packages
-------------------------------------------------------------------------------
*/

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menuOptions',
        message: 'Manager Menu Options:',
        choices: [
          'View Products for Sale',
          'View Low Inventory',
          'Add to Inventory',
          'Add New Product'
        ]
      }
    ])
    .then(answers => {
      //console.log(JSON.stringify(answers, null, '  '));
      switch (answers.menuOptions) {
        case "View Products for Sale":
          str = "List of all products available for sale:";
          viewInventory(str);
          break;
        case "View Low Inventory":
          str = "List of All Products Available for Sale with an Inventory Count Lower than Five:";
          viewInventory(str, 5);
          break;

        case "Add to Inventory":
          //global variables
          var prodIDToBuy = 0;
          var qtyToBuy = 0;

          /*prompt users with two messages.  
          1) ask for ID of the product
          2) ask how many units
          */

          var questions = [
            {
              type: 'input',
              name: 'productID',
              message: "Enter Product ID:",
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
              name: 'qtyToAdd',
              message: "Enter Quantity:",
              validate: function (value) {
                var n = parseInt(value);
                if ((Number.isInteger(n)) && (n > 0) && (value % 1 === 0)) {
                  return true;
                }
                return (chalkPipe('red.bold')('Please enter a valid Quantity.  Quantities must be a whole number.'));
              }
            }

          ];  //end questions

          /* Start Questions via inquirer NPM package */

          //customer questions via inquirer
          inquirer.prompt(questions).then(answers => {
            console.log(JSON.stringify(answers, null, '  '));
            prodIDToAdd = answers.productID;
            qtyToAdd = answers.qtyToAdd;
            addInventory(prodIDToAdd, qtyToAdd);
          });
          break;
        case "Add New Product":
          //construct inquirer questions
          var questions = [
            {
              type: 'list',
              name: 'departmentID',
              message: 'Choose a Department:',
              choices: [
                '1) greengrocery',
                '2) spirits',
                '3) media',
                '4) furnishings',
                '5) toys',
                '6) seasonal'
              ]
            },

            {
              type: 'input',
              name: 'productName',
              message: "Product Name:"
            },

            {
              type: 'input',
              name: 'productDescription',
              message: "Product Description:"
            },

            {
              type: 'input',
              name: 'price',
              message: "Sales Price:"
            },

            {
              type: 'input',
              name: 'stockQuantity',
              message: "Initial Inventory Quantity:",
              validate: function (value) {
                var n = parseInt(value);
                if ((Number.isInteger(n)) && (n > 0) && (value % 1 === 0)) {
                  return true;
                }
                return (chalkPipe('red.bold')('Please enter a valid Quantity.  Quantities must be a whole number.'));
              }
            },

            {
              type: 'input',
              name: 'UoM',
              message: "Unit of Measure:"
            },

            {
              type: 'input',
              name: 'comments',
              message: "Comments:"
            }

          ];  //end questions array

          /* Start Questions via inquirer NPM package */

          //customer questions via inquirer
          inquirer.prompt(questions).then(answers => {
            console.log(JSON.stringify(answers, null, '  '));
            departmentID = answers.departmentID.charAt(0);

            //construct query from object
            var qry = "INSERT INTO `bambizon_db`.`products`(";
            var qry1 = "";
            for (var i = 0; i<Object.keys(answers).length; i++) {
              qry += "`"+Object.keys(answers)[i]+"`,";
              if (i===0) {
                qry1 = Object.values(answers)[i].charAt(0)+",";
              } else {
                qry1 += "'"+Object.values(answers)[i]+"',";
              }
            } //end loop
            //strip last character of query & complete remaining query
            qry1 = qry1.slice(0, -1) + ",'Anna Manager');";
            qry = qry.slice(0, -1) + ",`recAddedBy`) VALUES ("+qry1;            
            //console.log(qry);

            addProduct(qry);
            //console.log("Length: "+answers.length);
          });
          break;
        default:
          console.log("Default");
      }
    });
} //end start function

function viewInventory(str, low = 99999999, order="asc", limit=99999999) {
  console.log(str);
  console.log(chalkPipe('cyan')("Viewing Inventory...\n"));
  //console.log(chalk.red('Hello', chalk.underline.bgYellowBright('world') + '!'));
  /* These variables are required by the NPM Tables library */
  let config,
    data,
    output;

  /* Create array to hold table rows. but we can use the data variable created needed by the NPM Table library 
   * It is an array in an array.  The first row is the header and it is predefined/hard-coded here.
   * Also data is required by  
  /*/
  //data = [['Product ID', 'Product Name', 'Price']];
  data = [['ID', 'Department', 'Product Name', 'Price', 'Quantity', 'Unit of Measure']];

  /* Configure table 
   * This configuration allows us to wrap text in each cell as well as truncate long data.
  */
  config = {
    //border: getBorderCharacters(`void`),
    columns: {
      0: {
        width: 3
      },
      1: {
        width: 15,
        wrapWord: true
      },
      2: {
        width: 30,
        truncate: 50,
        wrapWord: true
      },
      3: {
        alignment: 'right',
        minWidth: 10
      },
      4: {
        alignment: 'right',
        minWidth: 10
      }
    }
  };
  /* Create connection string to mySQL Database to return list of products */
  connection.query(
    "SELECT `productID`, `departmentName`, `productName`, format(`price`,2) as `price`, stockQuantity as quantity, UoM as `Unit of Measure` FROM `products` INNER JOIN `departments` ON `products`.`departmentID` = `departments`.`departmentID` WHERE `products`.`deactivate` = ? AND `stockQuantity` < ? ORDER BY `productID` "+order+" LIMIT "+limit, [0, low],
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

      console.log(chalkPipe('cyan')(str));
      console.log(output);
      //end connection 
      connection.end();



    });
} //end vewInventory function

function addInventory(productID, qty) {
  console.log(chalkPipe('cyan')("Adding Inventory...\n"));
  var sql = "UPDATE `products` SET `stockQuantity` = `stockQuantity`+" + qty + ", `recModBy` = ? WHERE `productID` = ? AND `deactivate` = ?"
  connection.query(sql, ['Jill Manager', productID, 0], function (err, res) {
    if (err) throw err;
    console.log("Inventory Updated");
    console.log("-----------------------------------");
    //end connection 
    connection.end();
  });
} //end addInventory function

function addProduct(sql) {
  console.log(chalkPipe('cyan')("Adding Product...\n"));
  console.log(sql);
  connection.query(sql, function (err, res) {
    if (err) throw err;
    console.log("New Product Added");
    console.log("-----------------------------------");

    //Display The Record for the added product
    //$sql1 = "SELECT `productID`, `departmentName`, `productName`, format(`price`,2) as `price`, stockQuantity as quantity, UoM as `Unit of Measure` FROM `products` INNER JOIN `departments` ON `products`.`departmentID` = `departments`.`departmentID` ORDER BY `productID` desc LIMIT 1;";
    str = "New Product Added:";
    low = 99999999;
    order="desc"; 
    limit=1;
    viewInventory(str, low, order, limit) 
    console.log("-----------------------------------");

      //end connection 
    //connection.end();
  });
} //end addProduct function