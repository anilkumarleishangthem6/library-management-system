//Data transfer object

class issuedBook{
  _id;
  name;
  author;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user){
    this._id = user.issuedBook._id;
    this.name = user.issuedBook.name;
    this.author = user.issuedBook.author;
    this.genre = user.issuedBook.genre;
    this.price = user.issuedBook.price;
    this.publisher = user.issuedBook.publisher;
    this.issuedBy = user.name;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }

}