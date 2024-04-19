import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
app.use(cors());

const PORT = 5555;

const mongoDB_URL =
  "mongodb+srv://sarangchamp2004:33333333@book-store-mern.89oe02b.mongodb.net/books-collevtion?retryWrites=true&w=majority&appName=Book-store-MERN";

app.get("/", (request, response) => {
  return response.status(234).send("welcome to the mern stack tutorial");
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
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

//Route for save a new Book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
// Route for Getting One Book From databse by ID
app.get("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books From databse
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for update a book
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title,author,publishYear",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Route for delete a book from Database
app.delete('/books/:id', async(request,response) => {
  try {
    const {id} = request.params;
    const result = await Book.findByIdAndDelete(id);
    if(!result){
      return response.status(404).json({ message: "Book Not Found" });
    }
    return response.status(200).send({message : "Book Deleted Successfully"})
  } catch (error) {
    console.log(error);
    response.status(500).send({message : error.message})
  }
})
