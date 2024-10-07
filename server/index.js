import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Error: " + err);
});

const app = express();
const port = 3000;

const Librarybook = new mongoose.Schema({
    title: String,
    author: String,
    publisher: String,
    isbn: String,
    status: String,
    checkedout: Boolean,
    duedate: String,
    checkedoutby: String,
});

const Book = mongoose.model('book', Librarybook, 'Books');

// Routing calls
app.get('/', async (req, res) => {
    res.send("Hello world! ");
});

// Display all books as a JSON to the user
// app.get('/Library', async (req, res) => {
//     try {
//         // Query the books collection for all documents
//         const books = await Book.find();  // This returns an array of books
        
//         // Send the array of books as a JSON response
//         res.json(books);
//     } catch (err) {
//         // Handle any potential errors
//         res.status(500).json({ msg: "Error fetching books", error: err });
//     }
// });

app.listen(port, () =>{
    console.log(`Server running on port ${port}. `);
});

