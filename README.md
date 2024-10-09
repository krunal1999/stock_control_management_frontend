This repository contains my final dissertation project. For more detailed information, please refer to the [https://github.com/krunal1999/stock_control_management_backend/blob/main/kbd6_final_report.pdf].

If you have any questions, feedback, or suggestions, feel free to reach out. We appreciate your interest in our project!


Open Stock control management 
There are 2 Folders 
Frontend -  https://github.com/krunal1999/stock_control_management_frontend
we need open this folder in vscode and run the following command

---  npm install
--- npm start


Backend - https://github.com/krunal1999/stock_control_management_backend

we need to open this folder in IntelliIdea 
then we need to make the database in Mysql workbench
then we need to add the  database details in application.property

then we can run the BackendApplication.java


--------------------------------------------------------------------------
Tech Stack - 

- Frontend - React , redux , javascript , Material Ui
- Backend - Java , Spring Boot , Mysql
- Version Control tool - git , svn

Project Overview - 

This was my University Dissertation Project. I used React and Spring Boot for this Project to manage Frontend and backend respectively. It can be used by Customer , Vendor and Admin, It act as an Ecommerce Platform for Customer and Admin can monitor and mange all the sells generate from it. Customer need to register and login. Then customer can search for the product and add the product to cart and proceed towards the payment. Admin can check the the Sales and pending order, Admin can deliver the Product to customer once customer makes the payment. Admin can check the stock availability and order new products or reorder the same product stock up from vendor , Admin can place order from vendor and once the order is received admin can Enter its details in System. Admin can also see the 2D warehouse map , where each of the item are stored. Admin has the analytic dashboard which gives overall stats of warehouse and sales data.

Use Case - 

- Vendor and Customer need to register and then login into the system
- customer can browse and search for the Product and read product details and add the product to the cart
- Customer can add the product to the cart and then proceed to the payment process.
- Payment is made using the stripe integration
- once the payment is complete , customer will get the notification via email and admin will see the new pending order
- Admin can check the total pending order and payment status.
- Admin can check the available stock, dead stock , stock require to restock, total quantity.
- Admin can complete the order , if available quantity are more than ordered quantity.
- If the quantities are less then admin need to restock the stock from vendor. to do so admin needs to place order for that product and wait for the order to receive, Once the order is received admin enter the details in the warehouse.
- Admin needs to pay to vendor for the products , admin can use Stripe payments to pay for the outstanding
- Admin can give discounts on the product,
- In admin Dashboard , Admin can see Data analytic charts , and 2D warehouse mapping, to show where products are stored.
- Stock Control System has features such as Minimum Quantity , formulas to calculate Optimum stock ( Economic order Quantity) required to keep running store.
- Admin can download the data in csv or pdf format.
- For security i have used JWT for the role based authentication. and password encryptio.
- Key Features - auto alert for minimum stock levels , auto stock reorder , 2d warehouse mapping , return and refund functionality.

Difficulty faced -

- Managing the entire Project and thinking of the architecture was challenging
- designing and maintaining the 2d Warehouse ui and making the changes after the product has be added or sold
- designing the UI using material UI and css
- Implementing the useful charts and getting useful insights from the chart to make data driven decisions.
