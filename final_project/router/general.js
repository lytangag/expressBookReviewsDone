const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    // Check if username and password is provided in the request body
    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "Customer successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "Customer already exists!" });
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({ message: "Unable to register Customer." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    //return res.status(300).json({books: books});
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(books), 1000);
    });

    promise.then((result) => {
        return res.status(200).json({ books: result });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    /*const isbn = req.params.isbn;
    res.send(books[isbn]);*/
    const isbn = req.params.isbn;
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve(books[isbn]), 1000);
    });
    promise.then(
        (result) => {res.send(result)},
        (reject) => {return res.status(404).json({message: "book not found"})},
        (error) => {return res.status(error.status).json({message: error.message})}
    )

});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    /*const author = req.params.author;
    let book = [];
    let filtered_books = Object.values(books).filter((book) => book.author === author);
    res.send(filtered_books);*/
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const author = req.params.author;
            let book = [];
            let filtered_books = Object.values(books).filter((book) => book.author === author);
            resolve(filtered_books);
        }, 1000);
    });
    promise.then(
        (result) => {res.send(result)},
        (reject) => {return res.status(404).json({message: "book not found"})},
        (error) => {return res.status(error.status).json({message: error.message})}
    )

});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    /*const title = req.params.title;
    let book = [];
    let filtered_books = Object.values(books).filter((book) => book.title === title);
    res.send(filtered_books);*/
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            const title = req.params.title;
            let book = [];
            let filtered_books = Object.values(books).filter((book) => book.title === title);
            resolve(filtered_books);
        }, 1000);
    });
    promise.then(
        (result) => {res.send(result)},
        (reject) => {return res.status(404).json({message: "book not found"})},
        (error) => {return res.status(error.status).json({message: error.message})}
    )
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
});

module.exports.general = public_users;
