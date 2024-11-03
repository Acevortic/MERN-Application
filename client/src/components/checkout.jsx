import React, { useState } from 'react';

function CheckoutBook() {
  const [bookTitle, setBookTitle] = useState(''); // State for the book title input
  const [userId, setuserId] = useState('');
  const [books, setBooks] = useState([]); // State for the list of books
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [newDueDate, setnewDueDate] = useState(new Date());

  // Function to fetch book data from the server
  const fetchCheckoutBook = async (newDueDate) => {
    setLoading(true); // Start loading
   // console.log("Book's new due date is: " + newDueDate);
    try {
      const response = await fetch(`http://localhost:3000/books/checkout?`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, bookTitle, duedate: newDueDate.toISOString() })
        }
      );
      
      const data = await response.json();
      setBooks(data); // Set the books state with the response data
    } catch (error) {
      console.error('Error checking out the book:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    

    const newDueDate = new Date();
    newDueDate.setDate(newDueDate.getDate() + 14); // Add 14 days (2 weeks)
    setnewDueDate(newDueDate);
    console.log(" THE Book's due date is: " + newDueDate);

    fetchCheckoutBook(newDueDate); // Fetch the book data
    setBookTitle('');
    setuserId('');
  };

  return (
    <div>
      <h2>Enter your name and a book's title to checkout a book: </h2>

      {/* Form for checking out a book */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookTitle">Enter the book title you want to checkout:</label>
          <input
            type="text"
            className="form-control"
            id="bookTitle"
            value={bookTitle} 
            onChange={(e) => setBookTitle(e.target.value)} 
            placeholder="Enter book title"
            required
          />

        <label htmlFor="userID">Enter your name:</label>
          <input
            type="text"
            className="form-control"
            id="checkedoutby"
            value={userId} // Use userId's initial state
            onChange={(e) => setuserId(e.target.value)} // Update userID on state change
            placeholder="Enter your name: "
            required
          />
          
        </div>
        <button type="submit" className="btn btn-primary">
          {loading ? 'Checking out...' : 'Submit'} {/* Show loading state */}
        </button>
      </form>

    </div>
  );
}

export default CheckoutBook;
