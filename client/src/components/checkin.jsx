import react, {useState} from 'react';

function CheckinBook() {
    const [bookTitle, setBookTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);

    const fetchCheckinBook = async () => {
    try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/books/checkin?title=${bookTitle}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({bookTitle}),
        })  
        const data = await response.json();
        setBooks(data); 
        } catch (error) {
        console.error('Error checking in the book:', error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

        // Handle form submission
        const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        fetchCheckinBook(); // Fetch the book's data
        setBookTitle('');
    };

    return (
        <div>
            <h2>Enter a book Title to check it in:  </h2>

            {/* Form for checking in a book */}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="bookTitle">Enter the book title you want to checkin:</label>
                <input
                type="text"
                className="form-control"
                id="bookTitle"
                value={bookTitle} 
                onChange={(e) => setBookTitle(e.target.value)} 
                placeholder="Enter book title"
                required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {loading ? 'Checking out...' : 'Submit'} {/* Show loading state */}
            </button>
            </form>
        </div>


    )

}
export default CheckinBook;

