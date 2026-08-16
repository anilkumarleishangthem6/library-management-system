const {UserModel, BookModel} = require('../models');
const userModel = require('../models/user-model');

// router.get('/',(req, res)=>{
//   res.status(200).json({
//     success: true,
//     data: users,
//   })
// })
exports.getAllUser = async(req,res) => {
  const users = await UserModel.find();

  if(!users || users.length === 0){
    return res.status(404).json({
      success:false,
      message:"No Users found"
    })
  }
  res.status(200).json({
    success:true,
    data:users
  })
}


// router.get('/:id',(req,res)=>{ 
//   const {id} = req.params;
//   const user = users.find((each)=>each.id === id)

//   if(!user){
//     return res.status(404).json({
//       success:false,
//       message: `user with ID ${id} not found`
//     })
//   }


//   res.status(200).json({
//     success:true,
//     data: user
//   })
// })

exports.getSingleUserById = async(req,res) => {
  const {id} = req.params;

  const user = await UserModel.findById(id);
  // const user = await UserModel.findById({_id:id});
  // const user = await UserModel.findOne({_id:id});
  
  if(!user){
    return res.status(404).json({
      success:false,
      message:`User with id ${id} not found`
    })
  }

  res.status(200).json({
    success:true,
    data:user
  })
}


// router.post('/',(req,res)=>{


//   //req.body should have following fields
//   const {id, name, surname, email, subscriptionDate, subscriptionType, } = req.body;
//   //Checks if all the required fields are filled
//   if(!id || !name || !surname || !email || !subscriptionDate || !subscriptionType){
//     return res.status(400).json({
//       success:false,
//       message:"Please fill all the required fields."
//     })
//   }

//   //Checks if the user already existed
//   const user = users.find((each)=> each.id === id)

//   if(user){
//     return res.status(409).json({
//       success: false,
//       message: `User already exists with id: ${id}`
//     })
//   }

//   //if all the checks pass, create the user 
//   //and push it to the user array 
//   users.push({
//     id,email,name,surname,subscriptionDate,subscriptionType
//   })
//   res.status(201).json({
//     success:true,
//     message: "User Registered Successfully"
//   })
// })

exports.createUser = async(req, res) => {
  const {data} = req.body;
  
  if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
      success:false,
      message:"Please provide the data to create a new user"
    })
  }

  await UserModel.create(data);
  const getAllUsers = await UserModel.find();

  res.status(200).json({
    success:true,
    message:"User created Successfully",
    data: getAllUsers
  })
}

// router.put('/:id', (req,res)=>{
 
//   const {id} = req.params;
//   const {data} = req.body;

//   const user = users.find((each)=>each.id === id)
//   if(!user){
//     return res.status(404).json({
//       success:false,
//       message: `User not found for id ${id}`
//     })
//   }

//   // Object.assign(user,data);
//   // With spread operator 
//   const updatedUsers = users.map((each)=>{
//     if(each.id === id){
//       return {
//         ...each,
//         ...data,
//       }
//     }
//     return each
//   })

//   res.status(200).json({
//     success:true,
//     data: updatedUsers,
//     message:"User Updated Successfully"
    
//   })

// })
exports.updateUserById = async(req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
      success:false,
      message:"Please provide data to update the user"
    })
  }

  //Check if the user exists
  const user = await UserModel.findById(id);
  if(!user){
    return res.status(404).json({
      success:false,
      message:`User not found for id: ${id}`
    })
  }

  //Update the user
  const updatedUser = await UserModel.findByIdAndUpdate(id,data,{new:true});

  res.status(200).json({
    success:true,
    message:"User updated successfully",
    data:updatedUser
  })
}



// router.delete('/:id',(req,res)=>{
//   const {id} =req.params;

//   const user = users.find((each)=>each.id === id)
//   if(!user){
//     return res.status(404).json({
//       success:false,
//       message:`User not found for id${id}`
//     })
//   }

//   const updatedUsers = users.filter((each) => each.id !== id)

//   // 2nd method
//   // const index = users.indexOf(user);
//   // users.splice(index,1);

//   res.status(200).json({
//     success:true,
//     data:updatedUsers,
//     message:"User deleted successfully",

//   })
// });

exports.deleteUserById = async(req,res) => {
  const {id} = req.params;

  //Check if the user exists
  const user = await UserModel.findById(id);

  if(!user){
    return res.status(404).json({
      success:false,
      message:`User not found for id: ${id}`
    })
  }

  //Delete the user
  await UserModel.findByIdAndDelete(id);
  res.status(200).json({
    success:true,
    message:"User deleted successfully"
  });
}


// router.get('/subscription-details/:id',(req, res)=>{
//   const {id}= req.params; 

//   // Find the user by ID
//   const user = users.find((each)=> each.id === id);
//   if(!user){
//     return res.status(404).json({
//       success: false,
//       message:`User not found for ID: ${id}`
//     })
//   }

//   //Extract the subscription details
//   const getDateInDays = (data = '') => {
//     let date;
//     if(data){
//       date = new Date(data);
//     }else{
//       date = new Date();
//     }

//     let days = Math.floor(date/ (1000  * 60 * 60 * 24));
//     return days;
//   }
  
//   const subscriptionType = (date) => {
//     if(user.subscriptionType === "Basic"){
//       date = date + 90;
//     }
//     else if(user.subscriptionType === "Standard"){
//       date = date + 180;
//     }
//     else if(user.subscriptionType === "Premium"){
//       date = date+ 365;
//     }
//     return date;
//   }

//   // Subscription Expiration Calculation
//   // January 1, 1970 UTC // miliseconds

//   let returnDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExpiration = subscriptionType(subscriptionDate);

//   const data = {
//     ...user,
//     subscriptionExpired:subscriptionExpiration < currentDate,
//     subscriptionDaysLeft: subscriptionExpiration - currentDate,
//     daysLeftForExpiration : returnDate - currentDate,
//     returnDate: returnDate < currentDate? "Book is overdue": returnDate,
//     fine: returnDate < currentDate? subscriptionExpiration <= currentDate? 200 : 100 : 0 
//   }

//   res.status(200).json({
//     success:true,
//     data
    
//   })

// });

exports.getSubscriptionDetailsById = async(req,res) => {
  const {id} = req.params;

  //find the user by id 
  const user = await UserModel.findById(id);
  if(!user){
    return res.status(404).json({
      success:false,
      message: `User not found for id: ${id}`
    });
  }

  //Extract the subscription details 

   const getDateInDays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    }

  const subscriptionType = (date) =>{
    if(user.subscriptionType === "Basic"){
      date = date+90
    } else if(user.subscriptionType === "Standard"){
      date = date+180
    } else if(user.subscriptionType === "Premium"){
      date = date+365
    }
    return date;
  }

  // Subscription Expiration Calculation

  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate= getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(user.subscriptionDate);

  const data = {
    ...user._doc,
    subscriptionExpired: subscriptionExpiration < currentDate,
    subscriptionDaysLeft: subscriptionExpiration - currentDate,
    daysLeftForExpiration: returnDate - currentDate,
    returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
    fine: returnDate < currentDate ? (subscriptionExpiration <= currentDate ? 200 : 100) : 0,
  };

  res.status(200).json({
    success: true,
    data,
  });
}