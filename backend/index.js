import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 5555;
const mongoDB_URL =
  "mongodb+srv://sarangchamp2004:33333333@book-store-mern.89oe02b.mongodb.net/books-collevtion?retryWrites=true&w=majority&appName=Book-store-MERN";

app.get("/", (req, res) => {

  return res.status(234).send("welcome to the mern stack tutorial");
});



mongoose
  .connect(mongoDB_URL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
  })
  .catch((error) => {
    console.log(error);
  });

  const bookSchema = mongoose.Schema(
      {
          title:{
              type:String,
              required:true,
          },
          author:{
              type:String,
              required:true,
          },
          publishYear:{
              type:Number,
              required:true,
          },
      },
      {
          timestamps:true,
      }
  )
  
  const Book = mongoose.model('Book',{bookSchema});

  //Route for save a new Book
  app.post('/books', async(request,response) => {
    try {
        if(!request.body.title || request.body.author || request.body.publishYear){
            return response.status(400).send({message : 'Send all required fields: title,author,publishYear'})
        };
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
  })