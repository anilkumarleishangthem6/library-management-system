const express = require("express")
const {books} = require("../data/books.json")
const {users} = require("../data/users.json")

// const UserModel = require("../models/user-model")
// const BookModel = require("../models/book-model")
const {UserModel, BookModel} = require("../models/index.js")
const {getAllBooks, getSingleBookById, getAllissuedBooks,addNewBook, updateBookById, deleteBookById} = require('../controllers/book-controller.js')

const router = express.Router()


/**
 * Route: /books
 * Methos: GET
 * Description: Get all the list of the books in the system
 * Access: Public
 * Parameters: None
 */

// router.get('/',(req, res)=>{
//   res.status(200).json({
//     success: true,
//     data: books
//   })
// })
router.get('/',getAllBooks)

/**
 * Route: /books/id
 * Methos: GET
 * Description: Get a books by their ID
 * Access: Public
 * Parameters: None
 */

// router.get('/:id',(req,res)=>{
//   const {id} = req.params;
//   const book = books.find((each)=>each.id === id)

//   if(!book){
//     return res.status(404).json({
//       success:false,
//       message: `Book with ID ${id} not found`
//     })
//   }


//   res.status(200).json({
//     success:true,
//     data: book
//   })
// })
router.get('/:id',getSingleBookById)


/**
 * Route: /books
 * Methos: POST
 * Description: Create/Register a new book
 * Access: Public
 * Parameters: None
 */

// router.post('/',(req,res)=>{

//   // "id": "6",
//   //     "name": "Trinkle",
//   //     "author": "Frank Herbert",
//   //     "genre": "Sci-Fi",
//   //     "price": "12",
//   //     "publisher": "Chilton Books"

//   //req.body should have following fields
//   const {id, name, author, genre, price, publisher, } = req.body;
//   //Checks if all the required fields are filled
//   if(!id || !name || !author || !genre || !price || !publisher){
//     return res.status(400).json({
//       success:false,
//       message:"Please fill all the required fields."
//     })
//   }

//   //Checks if the user already existed
//   const book = books.find((each)=> each.id === id)

//   if(book){
//     return res.status(409).json({
//       success: false,
//       message: `Book already exists with id: ${id}`
//     })
//   }

//   //if all the checks pass, create the book 
//   //and push it to the user array 
//   books.push({
//     id,name,author,genre,price,publisher
//   })
//   res.status(201).json({
//     success:true,
//     message: "Book Registered Successfully"
//   })
// })


router.post('/', addNewBook)


/**
 * Route: /books/:id
 * Methos: PUT
 * Description: Updating a book by their ID 
 * Access: Public
 * Parameters: None
 */

// router.put('/:id', (req,res)=>{
 
//   const {id} = req.params;
//   const {data} = req.body;

//   const book = books.find((each)=>each.id === id)
//   if(!book){
//     return res.status(404).json({
//       success:false,
//       message: `Book not found for id ${id}`
//     })
//   }

//   // Object.assign(book,data);
//   // With spread operator 
//   const updatedBooks = books.map((each)=>{
//     if(each.id === id){
//       return {
//         ...each,
//         ...data,
//       }
//     }
//     return each;
//   })

//   res.status(200).json({
//     success:true,
//     message:"Book Updated Successfully",
//     data: updatedBooks
    
//   })

// })

router.put('/:id', updateBookById)


/**
 * Route: /books/:id
 * Methos: Delete
 * Description: Deleting a book user by their ID 
 * Access: Public
 * Parameters: None
 */

// router.delete('/:id',(req,res)=>{
//   const {id} =req.params;

//   const book = books.find((each)=>each.id === id)
//   if(!book){
//     return res.status(404).json({
//       success:false,
//       message:`Book not found for id${id}`
//     })
//   }

//   const updatedBooks = books.filter((each) => each.id !== id)

//   // 2nd method
//   // const index = books.indexOf(book);
//   // books.splice(index,1);

//   res.status(200).json({
//     success:true,
//     message:"Book deleted successfully",
//     data:updatedBooks,

//   })
// });

router.delete('/:id',deleteBookById)


/**
 * Route: /books/issued/for-users
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameter: None
 */
// router.get("/issued/for-users",(req, res)=>{
//   // const issuedBooks = books.filter((each) => each.issued === true);
//   const usersWithIssuedBooks = users.filter((each)=>{
//     if(each.issuedBook){
//       return each;
//     }
//   })

//   const issuedBooks = [];
  
//   usersWithIssuedBooks.forEach((each) =>{
//     const book = books.find((book)=>book.id === each.issuedBook);

//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book)
    
//   })

//   if(!issuedBooks === 0){
//     return res.status(404).json({
//       success:false,
//       message: "No books issued yet"
//     })
//   }

//   res.status(200).json({
//     success: true,
//     data:issuedBooks
//   });
// });

router.get("/issued/for-users", getAllissuedBooks);


module.exports = router;