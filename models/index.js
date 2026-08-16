const UserModel = require('./user-model')
const BookModel = require('./book-model')

module.exports = { UserModel, BookModel };

//this file is used to export the models so that they can be used in other parts of the application. It imports the UserModel and BookModel from their respective files and then exports them as an object. This allows other files to easily access the models by requiring this index.js file.