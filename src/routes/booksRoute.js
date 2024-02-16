const express = require("express");
const Book = require("../models/bookModels");

//  Import the express router module
const router = express.Router();

// Save a book
router.post("/", async (request, response) => {
    try {
        // If a field data is missing
        if(!request.body.title || !request.body.author || !request.body.publishYear) {
            // data error
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        // Save a new book on the database
        const book = await Book.create(newBook);
        // sever response
        return response.status(201).send(book);
    } catch (err) {
        // Server error
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
})

// Get all books
router.get("/", async (request, response) => {
    try{
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    }catch (err){
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
})

// get a book by id
router.get("/:id", async (request, response) => {
    try{
        // Get the id from request params
        const { id } = request.params;
        const book = await Book.findById(id);

        return response.status(200).json(book);
    }catch (err){
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
})

// update a book
router.put("/:id", async (request, response) => {
    try{
       // If a field data is missing
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            // data error
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear"
            });
        }
        // Get the id from request params
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);
        
        // check if element does not exists
        if(!result) {
            return response.status(404).json({ message: "Book not found"});
        }

       return response.status(200).send({message: "Book updated successfully"});
    }catch (err){
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
})

// Delete a book
router.delete("/:id", async (request, response) => {
    try{
        // Get the id from request params
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);
        
        // check if element does not exists
        if(!result) {
            return response.status(404).json({ message: "Book not found"});
        }

       return response.status(200).send({message: "Book deleted successfully"});
    }catch (err){
        console.log(err.message);
        response.status(500).send({ message: err.message });
    }
})

module.exports = router;
