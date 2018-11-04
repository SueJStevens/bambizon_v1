# BambiZon
Bootcamp Assignment 10/28/2018 - Node.js &amp; MySQL
## About Us
BambiZon is an e-commerce company founded in 2018 as a niche marketplace to supply hard-to-find items to Hollywood's most elite and ageless cartoon characters.  Since it's humble beginnings when it had only 2 products (snow mittens sized perfectly for little dancing hooves, and sustainably sourced rain forest cotton-tail shampoo), BambiZon has grown to a multi-baZillion buZiness and is the world's largest online imaginary retailer.  You can find the BambiZon marketplace at https://github.com/SueJStevens/bambizon_v1.  We accept all forms of virtual currency including $Disney$Dollars, $Monopoly$Money and $bit$Coin.  Come $hop with us today!
## App Features
### Customer View
1. All items available for sale will populate the view when the customer runs the app.
![allitemsavailableforsale](https://user-images.githubusercontent.com/39141985/47957756-49faa500-df79-11e8-9b5b-29da5d3bc926.png)
2. App will prompt the user with 2 messages so the user can purchase items
![customerprompts](https://user-images.githubusercontent.com/39141985/47957766-8fb76d80-df79-11e8-89d8-1d1ab216d733.png)
3. App will check the store to confirm there is quantity to fulfill order
       Screen Shot for insufficient quantity
![insufficientquantityresponse](https://user-images.githubusercontent.com/39141985/47957896-035a7a00-df7c-11e8-8ee8-98a375b18e1c.png)
4. If sufficient quantity, order is fulfilled.  Database quantity and sales fields are updated and app gives user total cost of their purchase 
       Screen Shot from MySQL Workbench of state of data before purchase
![datastatebeforepurchase](https://user-images.githubusercontent.com/39141985/47957854-2fc1c680-df7b-11e8-89bf-984116b68840.png)
  Screen Shot of Customer's total cost
![totalcostofpurcahse](https://user-images.githubusercontent.com/39141985/47957848-0143eb80-df7b-11e8-93d5-51458b1795ac.png)
  Screen shot of new quantity and total sales from MySQL Workbench after purchase
![datastateafterpurchase](https://user-images.githubusercontent.com/39141985/47957880-78797f80-df7b-11e8-871e-946671b0602e.png)


### Manager View
  Manager View has a menu list to choose from
![managermenu](https://user-images.githubusercontent.com/39141985/47957910-6ba95b80-df7c-11e8-9314-c5a704f4ae46.png)

1. View Products for Sale
   Lists every available item
![managermenu_viewproductsforsale](https://user-images.githubusercontent.com/39141985/47957917-a612f880-df7c-11e8-8608-c8d3b7e6ae26.png)

2. View Low Inventory
   List items with an inventory count lower than 5
![managermenu_viewlowinventory](https://user-images.githubusercontent.com/39141985/47957945-6698dc00-df7d-11e8-8060-392dbddd5d81.png)

3. Add to Inventory
   Displays prompts so manager can add more items
![managermenu_addinventory](https://user-images.githubusercontent.com/39141985/47957968-1b32fd80-df7e-11e8-8c49-ea3ab9048799.png)

![thestorycontinues](https://user-images.githubusercontent.com/39141985/47957995-a7452500-df7e-11e8-8821-74800ee1efe1.png)

4. Add New Product
   Displays prompts so manager can add a completely new product
![manager_addnewproduct](https://user-images.githubusercontent.com/39141985/47958018-8fba6c00-df7f-11e8-8796-21e089c95f31.png)
        
### Supervisor View
Superviser View has a menu list to choose from
![supervisormenu](https://user-images.githubusercontent.com/39141985/47958026-c0020a80-df7f-11e8-94f7-45059b0c790e.png)

1. View Product Sales by Department
   Screen Shot of Summerized Table
![supervisorview_listofsales](https://user-images.githubusercontent.com/39141985/47958050-2f77fa00-df80-11e8-90dc-95b9d08caa8e.png)

2. Create New Department
![supervisorview_addnewdept](https://user-images.githubusercontent.com/39141985/47958096-3e12e100-df81-11e8-9a4d-aaf745597daa.png)
