# library-management-system

  This is a library management API Backend for the management of users and the books

# Routes and the Endpoints 

## /users 
GET: Get all the list of users in the system 
POST: Create/Register a new user 

## /users/{id}
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID (Check if the user still has an issued book) && (is there any fine/penalty to be collected)

## /users/subscription-details/{id}
GET: Get a user subscription details by their ID
  >> date of subscription
  >> Valid till ?
  >> Fine if any ?

## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book by its ID 

## /books/issued
GET: Get all the issued books

## /books/issued/withFine
GET: Get all issued books with their fine amount


##  Subscription Types
  >> Basic (3 Months)
  >> Standard (6 Months)
  >> Premium (12 Months)

> > If a user misses the renewal date, then user should be collected with 100 rupees
> > If a user misses his subscription, then user is expected to pay 100 rupees
> > if a user misses both renewal and subscription, then the collected amount should be 200 Rupees

## Commands:
npm init
npm i express

npm run dev

To restore node modules and package-lock.json --> npm i/ npm install

npm i mongoose
npm install mongodb



npm i dotenv

## MVC Architecture
  >> M: Model (Structure of MongoDB)
  >> V: View (Frontend)
  >> C: Controllers (Brain/Logic of a route)

### DTO (Data Transfer Object)