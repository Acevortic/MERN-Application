import React, {useState, useEffect} from "react";

function AvailableBooks({ refresh }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAvailableBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/books/availablebooks'); 
            const data = await response.json();
            setBooks(data);  // Set the fetched books to state
          } catch (error) {
            console.error('Error fetching available books:', error);
          } finally {
            setLoading(false);  // Stop loading once data is fetched
          }
        }

      useEffect(() => {
        fetchAvailableBooks();
      }, [refresh]);

return (
    <div>
        <h1>Available Books For Checkout:</h1>
            <button onClick={fetchAvailableBooks}> Show availablebooks</button>
            <ul>
        {books.map((book, index) => (
          <li key={index} style = {{marginBottom: '15px'}}>
            <strong> Book's Title: </strong> {book.title} <strong>Author:</strong> {book.author} <strong>Published By:</strong> {book.publisher}
          </li>
        ))}
      </ul>

    </div>

)
}

export default AvailableBooks;