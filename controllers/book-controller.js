const {BookModel, UserModel} = require('../models/index')

const issuedBook = require('../dtos/book-dto')

// const getAllBooks = ()=>{

// }

// const getSingleBookById = ()=>{

// }
// module.exports = {getAllBooks, getSingleBookById}

// router.get('/',(req, res)=>{
//   res.status(200).json({
//     success: true,
//     data: books
//   })
// })

exports.getAllBooks = async(req, res) => {
  const books = await BookModel.find()

  if(books.length === 0){
    return res.status.json({
      success:false,
      message:"No Books in the system"
    })
  }
  res.status(200).json({
    success:true,
    data:books
  })
}

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

exports.getSingleBookById = async(req, res) => {
  const {id} = req.params;
  const book = await BookModel.findById(id)

  if(!book){
    return res.status(404).json({
      success:false,
      message: `Book with ID ${id} not found`
    })
  }

  res.status(200).json({
    success:true,
    data: book
  })
}

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

exports.getAllissuedBooks = async(req,res) => {
  const users = await UserModel.find({
    issuedBook: {$exists:true},
  }).populate("issuedBook")

  const issuedBooks = users.map((each)=>{
    return new issuedBook(each);
  });

  if(issuedBooks.length === 0){
    return res.status(404).json({
      success:false,
      message: "No books issued yet"
    })
  }
  res.status(200).json({
    success: true,
    data:issuedBooks
  });
}


// router.post('/',(req,res)=>{
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

exports.addNewBook = async(req,res)=>{
  const {data} = req.body;

  if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
      success: false,
      message:"Please provide the data to add a new book."
    })
  }

  await BookModel.create(data);
  // to get the particular book
  // res.status(201).json({
  //   success:true,
  //   message:"Book added successfully",
  //   data: data
  // })

  //to get all the books
  const allBooks = await BookModel.find();
  res.status(201).json({
    success:true,
    message:"Book added successfully",
    data:allBooks
  })
}

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

exports.updateBookById = async(req,res)=>{
  const {id} = req.params;
  const {data} = req.body;

  if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
      success:false,
      message:"Please provide the data to update"
    })
  }

  // Check if the book exists
  const updatedBook = await BookModel.findOneAndUpdate(
    {_id:id},
    data,
    {new:true}
  );
  if(!updatedBook){
    return res.status(404).json({
      success:false,
      message:`Book not found for id:${id}`
    })
  }

  res.status(200).json({
    success:true,
    message: "Book updated successfully",
    data:updatedBook
  })
}

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

exports.deleteBookById = async(req,res)=>{
  const {id} = req.params;

  const book = await BookModel.findById(id);
  if(!book){
    return res.status(404).json({
      success:false,
      message:`Book not found for id:${id}`
    })
  }

  await BookModel.findByIdAndDelete(id);
  res.status(200).json({
    success:true,
    message:"Book Deleted Successfully"
  })
}