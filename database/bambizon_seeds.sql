-- Drops the bambizon_db if it exists currently --
DROP DATABASE IF EXISTS bambizon_db;
-- Creates the "bambizon_db" database --
CREATE DATABASE IF NOT EXISTS bambizon_db;

-- Makes it so all of the following code will affect bambizon_db --
USE bambizon_db;

-- Drops the products table in the bambizon_db if it exists currently --
DROP TABLE IF EXISTS products;

-- Create the products table in the bambizon_db --
-- Notes: INT and INTEGER are synonymous in MySQL, but use INTEGER for compatability with other DBMS (such as POSTGresSQL, use INTEGER
CREATE TABLE products(
  `productID` INTEGER(11) AUTO_INCREMENT NOT NULL,
  `departmentID` INTEGER(11) NOT NULL,  -- foreign key, see departments table
  `productName` VARCHAR(100) NOT NULL,  -- name of product
  `productDescription` VARCHAR(250) NOT NULL,  -- description of product provided by marketing
  `price` DECIMAL(10,2) NOT NULL DEFAULT 0,  -- not discounted sales price of product
  `stockQuantity` INTEGER NOT NULL,  -- quantity on hand in inventory
  `UoM` VARCHAR(25), -- type of unit sold i.e., each, piece, foot, lb, gallon, etc.
  `productSales` DECIMAL(10,2) NOT NULL DEFAULT 0,  -- Total lifetime sales (total price, not quantity) of product
  `comments` VARCHAR(250) NULL,  -- internal use only, information about this record.  Usually used to describe why a record was deactivated
  `deactivate` BIT NOT NULL DEFAULT 0,  -- flag to remove record from customer and manager views without deleting record from table
  `recModDtTm` DATETIME ON UPDATE CURRENT_TIMESTAMP,  -- default NULL until record is modified, then auto update to current local datetime
  `recModBy` VARCHAR(30) NULL,  -- person who modified this record if record modified.  Null if record never modified.
  `recAddedDtTm` DATETIME DEFAULT CURRENT_TIMESTAMP,  -- default auto update to current local datetime when record is created, then do not update again
  `recAddedBy` VARCHAR(30) NOT NULL,  -- person who created this record.  Does not change after initially set.
  `tmStmp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- UNC timestamp auto updated when record is created and updated again when record is modified
  PRIMARY KEY (productID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Drops the products table in the bambizon_db if it exists currently --
DROP TABLE IF EXISTS departments;

-- Create the departments table in the bambizon_db --
CREATE TABLE departments(
  `departmentID` INTEGER(11) AUTO_INCREMENT NOT NULL,
  `departmentName` VARCHAR(50) NOT NULL,  -- short, common name of department
  `displayName` VARCHAR(100) NOT NULL,  -- department name to display to customer
  `overheadCosts` DECIMAL(10,2) NOT NULL DEFAULT 0,  -- fixed overhead attributed to the department
  `comments` VARCHAR(250) NULL,  -- internal use only, information about this record.  Usually used to describe why a record was modified or deactivated
  `deactivate` BIT NOT NULL DEFAULT 0,  -- flag to remove record from views without deleting record from table
  `recModDtTm` DATETIME ON UPDATE CURRENT_TIMESTAMP,  -- default NULL until record is modified, then auto update to current local datetime
  `recModBy` VARCHAR(30) NULL,  -- person who modified this record if record modified.  Null if record never modified.
  `recAddedDtTm` DATETIME DEFAULT CURRENT_TIMESTAMP,  -- default auto update to current local datetime when record is created, then do not update again
  `recAddedBy` VARCHAR(30) NOT NULL,  -- person who created this record.  Does not change after initially set.
  `tmStmp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- UNC timestamp auto updated when record is created and updated again when record is modified
  PRIMARY KEY (departmentID)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Alter products table to create foreign key to departments table --
ALTER TABLE products
ADD FOREIGN KEY fk_departments(departmentID)
REFERENCES departments(departmentID)
ON DELETE NO ACTION
ON UPDATE CASCADE;