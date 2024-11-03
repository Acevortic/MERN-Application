import express from "express";
import Book from "../index.js";

// This helps convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

router.get('/availablebooks', async (req, res) => {
    try {
        const available = await Book.find({"checkedout": false});
        res.json(available);
    } catch (err) {
        res.status(500).json({ msg: "Errors fetching available books", error: err });
    }
});

router.get('/checkedoutbooks', async (req, res) => {
    try {
        const checkedout = await Book.find({"checkedout": true});
        res.json(checkedout);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching available books", error: err });
    }
});

router.post('/checkout', async (req, res) => {
    try {
        const { userId, bookTitle, duedate } = req.body;

        // Find the book by title and ensure it's not already checked out
        const book = await Book.findOne({ title: bookTitle, checkedout: false });

        console.log("User checking out: ", userId);
        console.log("Attempting to find the book:", bookTitle);
        console.log("Book's new due date: ", duedate);
        console.log(req.body);

        // If the book is already checked out or not found, return appropriate errors
        if (!book) {
            return res.status(404).json({ msg: "Book not found or already checked out" });
        }

        // Proceed with checking out the book (updating its status)
        const checkout = await Book.findOneAndUpdate(
            { _id: book._id },  // Search criteria
            { 
                checkedout: true,  // Set checked out status to true
                status: "unavailable",
                checkedoutby: userId,
                duedate: duedate
            }, 
            { new: true }  // Return the updated document
        );

        console.log("Book checked out successfully:", checkout);

        res.json({ msg: "Book checked out successfully", checkout });
    } catch (err) {
        console.error("Error during checkout:", err);
        res.status(500).json({ msg: "Error checking out the book", error: err });
    }
});

router.post('/checkin', async (req, res) => {
        try {
            const {bookTitle} = req.body;
            const book = await Book.findOne({ title: bookTitle });
            if (!book) {
                res.status(500).json({msg: "Book not found in the library. "});
            }

            const checkin = await Book.findByIdAndUpdate(book._id, 
                {"checkedout": false, 
                    "status": "available"
                }, { new: true } // Return the updated document
            );                                                              
            console.log("Book checked in successfully. ");
            res.json({ msg: "Book checked in successfully", checkin });
    } catch (err) {
        res.status(500).json({ msg: "Error checking in the book", error: err });
    }
});

export default router;