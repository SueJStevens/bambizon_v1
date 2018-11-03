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
        message: 'Supervisor Menu Options:',
        choices: [
          'View Sales by Department',
          'Create New Department'
        ]
      }
    ])
    .then(answers => {
      //console.log(JSON.stringify(answers, null, '  '));
      switch (answers.menuOptions) {
        case "View Sales by Department":
          str = "List of Sales by Department:";
          displayDeptProfit(str);
          break;
        case "Create New Department":
          //construct inquirer questions
          var questions = [
            {
              type: 'input',
              name: 'departmentName',
              message: "Department Name:"
            },

            {
              type: 'input',
              name: 'displayName',
              message: "Display Name:"
            },

            {
              type: 'input',
              name: 'overheadCosts',
              message: "Overhead Costs:",
              validate: function (value) {
                var n = value;
                var regex = /^[1-9]\d*((\.\d{0,2})?)$/;
                if (regex.test(n)) {
                  return true;
                }
                return (chalkPipe('red.bold')('Please enter a valid amount.  Overhead must be a number.  Up to 2 decimal places allowd'));
              }
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

            //construct query from object
            var qry = "INSERT INTO `bambizon_db`.`departments`(";
            var qry1 = "";
            for (var i = 0; i < Object.keys(answers).length; i++) {
              qry += "`" + Object.keys(answers)[i] + "`,";
              qry1 += "'" + Object.values(answers)[i] + "',";
            } //end loop
            //strip last character of query & complete remaining query
            qry1 = qry1.slice(0, -1) + ",'Kent Supervisor');";
            qry = qry.slice(0, -1) + ",`recAddedBy`) VALUES (" + qry1;
            //console.log(qry);

            addDepartment(qry);
          });
          break;
        default:
          console.log("Default");
      }
    });
} //end start function

function addDepartment(sql) {
  console.log(chalkPipe('cyan')("Adding Product...\n"));
  console.log(sql);
  connection.query(sql, function (err, res) {
    if (err) throw err;
    console.log("New Department Added");
    console.log("-----------------------------------");
    readDepartments();
  });

} //end addProduct function

function readDepartments() {
  /* These variables are required by the NPM Tables library */
  let config,
    data,
    output;

  /* Create array to hold table rows. but we can use the data variable created needed by the NPM Table library 
   * It is an array in an array.  The first row is the header and it is predefined/hard-coded here.
   * Also data is required by  
  /*/
  data = [['ID', 'Department', 'Display Name', 'Overhead Costs', 'Comments']];

  /* Configure table 
   * This configuration allows us to wrap text in each cell as well as truncate long data.
  */
  config = {
    columns: {
      0: {
        width: 3
      },
      1: {
        width: 20,
        wrapWord: true
      },
      2: {
        width: 35,
        wrapWord: true
      },
      3: {
        width: 15
      }
    },
    4: {
      width: 35,
      truncate: 50,
      wrapWord: true
    }
  };
  /* Create connection string to mySQL Database to return list of all Departments */
  connection.query(
    "SELECT `departmentID`, `departmentName`, `displayName`, format(`overheadCosts`,2) as `Overhead Costs`, `comments` as `Comments` FROM `departments` ORDER BY `departmentID`;",
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

      console.log("Department Added:");
      console.log(output);
      connection.end();
    });

}

function displayDeptProfit(str) {
  console.log(str);
  /* These variables are required by the NPM Tables library */
  let config,
    data,
    output;

  /* Create array to hold table rows. but we can use the data variable created needed by the NPM Table library 
   * It is an array in an array.  The first row is the header and it is predefined/hard-coded here.
   * Also data is required by  
  /*/
  data = [['ID', 'Department', 'Overhead Costs', 'Product Sales', 'Total Profit']];

  /* Configure table 
   * This configuration allows us to wrap text in each cell as well as truncate long data.
  */
  config = {
    columns: {
      0: {
        width: 3
      },
      1: {
        width: 35,
        wrapWord: true
      },
      2: {
        minwidth: 15
      },
      3: {
        minwidth: 15
      },
      4: {
        minwidth: 15
      }
    }
  };
  /* Create connection string to mySQL Database to return list of all Departments */
  connection.query(
    "SELECT p.`departmentID`,d.`displayName`,d.`overheadCosts`,sum(p.`productSales`) as `productSales`,sum(p.`productSales`) - d.`overheadCosts` as `totalProfit`FROM `products` p INNER JOIN `departments` d ON p.`departmentID` = d.`departmentID` GROUP BY p.`departmentID`, d.`departmentName` ORDER BY `totalProfit`;",
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

      console.log(output);
      connection.end();
    });

}