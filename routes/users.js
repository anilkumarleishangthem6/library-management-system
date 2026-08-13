const express= require("express");
const {users} = require("../data/users.json")

const router = express.Router();

/**
 * Route: /users
 * Methos: GET
 * Description: Get all the list of the users in the system
 * Access: Public
 * Parameters: None
 */

router.get('/',(req, res)=>{
  res.status(200).json({
    success: true,
    data: users,
  })
})

/**
 * Route: /users/id
 * Methos: GET
 * Description: Get a user by their ID
 * Access: Public
 * Parameters: None
 */

router.get('/:id',(req,res)=>{ 
  const {id} = req.params;
  const user = users.find((each)=>each.id === id)

  if(!user){
    return res.status(404).json({
      success:false,
      message: `user with ID ${id} not found`
    })
  }


  res.status(200).json({
    success:true,
    data: user
  })
})

/**
 * Route: /users
 * Methos: POST
 * Description: Create/Register a new user
 * Access: Public
 * Parameters: None
 */

router.post('/',(req,res)=>{

  //     "id": "3",
  //     "name": "Alex",
  //     "surname": "Smith",
  //     "email": "alex.smith@email.com",
  //     "issuedBook": "3",
  //     "issuedDate": "05/15/2022",
  //     "returnDate": "06/15/2022",
  //     "subscriptionType": "Basic",
  //     "subscriptionDate": "05/15/2022"

  //req.body should have following fields
  const {id, name, surname, email, subscriptionDate, subscriptionType, } = req.body;
  //Checks if all the required fields are filled
  if(!id || !name || !surname || !email || !subscriptionDate || !subscriptionType){
    return res.status(400).json({
      success:false,
      message:"Please fill all the required fields."
    })
  }

  //Checks if the user already existed
  const user = users.find((each)=> each.id === id)

  if(user){
    return res.status(409).json({
      success: false,
      message: `User already exists with id: ${id}`
    })
  }

  //if all the checks pass, create the user 
  //and push it to the user array 
  users.push({
    id,email,name,surname,subscriptionDate,subscriptionType
  })
  res.status(201).json({
    success:true,
    message: "User Registered Successfully"
  })
})


/**
 * Route: /users/:id
 * Methos: PUT
 * Description: Updating a user by their ID 
 * Access: Public
 * Parameters: None
 */
router.put('/:id', (req,res)=>{
 
  const {id} = req.params;
  const {data} = req.body;

  const user = users.find((each)=>each.id === id)
  if(!user){
    return res.status(404).json({
      success:false,
      message: `User not found for id ${id}`
    })
  }

  // Object.assign(user,data);
  // With spread operator 
  const updatedUsers = users.map((each)=>{
    if(each.id === id){
      return {
        ...each,
        ...data,
      }
    }
    return each
  })

  res.status(200).json({
    success:true,
    data: updatedUsers,
    message:"User Updated Successfully"
    
  })

})

 
/**
 * Route: /users/:id
 * Methos: Delete
 * Description: Deleting a user by their ID 
 * Access: Public
 * Parameters: None
 */

router.delete('/:id',(req,res)=>{
  const {id} =req.params;

  const user = users.find((each)=>each.id === id)
  if(!user){
    return res.status(404).json({
      success:false,
      message:`User not found for id${id}`
    })
  }

  const updatedUsers = users.filter((each) => each.id !== id)

  // 2nd method
  // const index = users.indexOf(user);
  // users.splice(index,1);

  res.status(200).json({
    success:true,
    data:updatedUsers,
    message:"User deleted successfully",

  })
});

/**
 * Route: /books/subscription-details/:id
 * Method: GET
 * Description: Get all the subscription details of a user by their ID
 * Access: Public
 * Parameter: ID
 */

router.get('/subscription-details/:id',(req, res)=>{
  const {id}= req.params; 

  // Find the user by ID
  const user = users.find((each)=> each.id === id);
  if(!user){
    return res.status(404).json({
      success: false,
      message:`User not found for ID: ${id}`
    })
  }

  //Extract the subscription details
  const getDateInDays = (data = '') => {
    let date;
    if(data){
      date = new Date(data);
    }else{
      date = new Date();
    }

    let days = Math.floor(date/ (1000  * 60 * 60 * 24));
    return days;
  }
  
  const subscriptionType = (date) => {
    if(user.subscriptionType === "Basic"){
      date = date + 90;
    }
    else if(user.subscriptionType === "Standard"){
      date = date + 180;
    }
    else if(user.subscriptionType === "Premium"){
      date = date+ 365;
    }
    return date;
  }

  // Subscription Expiration Calculation
  // January 1, 1970 UTC // miliseconds

  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    subscriptionExpired:subscriptionExpiration < currentDate,
    subscriptionDaysLeft: subscriptionExpiration - currentDate,
    daysLeftForExpiration : returnDate - currentDate,
    returnDate: returnDate < currentDate? "Book is overdue": returnDate,
    fine: returnDate < currentDate? subscriptionExpiration <= currentDate? 200 : 100 : 0 
  }

  res.status(200).json({
    success:true,
    data
    
  })

});

module.exports = router;
 