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

router.get('/checkout', async (req, res) => {
    try {
        const checkout = await Book.findByIdAndUpdate("66f826eff369ac59899f442a", 
            {"checkedout": true, 
                "status": "unavailable"
            }, { new: true } // Return the updated document
        );                                                              //todo: Add the user who checked the book out
        console.log("Updated the user successfully. ");
        res.json({ msg: "Book checked out successfully", checkout });
    } catch (err) {
        res.status(500).json({ msg: "Error checking out the book", error: err });
    }
});

router.get('/checkin', async (req, res) => {
    try {
        const checkin = await Book.findByIdAndUpdate("66f826eff369ac59899f442a", 
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