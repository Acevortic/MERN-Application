import React, {useState, useEffect} from "react";

function CheckedoutBooks({ refresh }) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchCheckedoutBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/books/checkedoutbooks'); 
            const data = await response.json();
            setBooks(data);
        } catch(error) {
            console.error("There was an error retrieving checkedoutbooks", error)
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        fetchCheckedoutBooks();
    }, [refresh]);

    return (
        <div>
        <h2>Checked out books:</h2>
            <button onClick={fetchCheckedoutBooks}> Show checkedoutbooks</button>
            <ul>
        {books.map((book, index) => (
          <li key={index} style = {{marginBottom: '15px'}}>
            <strong> Book's Title: </strong>  {book.title}<br /> <strong> Author: </strong> {book.author} <br /> <strong> Due by: </strong> {book.duedate} <br /> 
               <strong> CheckedOutBy: </strong>  {book.checkedoutby} 
          </li>
        ))}
      </ul>

    </div>

    )

}

export default CheckedoutBooks;