import { useState, useEffect } from 'react'
import api from './../../api/books';
import { Link, useNavigate } from "react-router-dom";
import './style.css'
export default function AllRequests() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const retreiveallBooks = async () => {
        const response = await api.get("/requestedBooks");
        return response.data;
    }
    useEffect(() => {
        const getAllBooks = async () => {
            const allBooks = await retreiveallBooks();
            if (allBooks) {
                setBooks(allBooks);
            }
        }
        getAllBooks();
    }, []);
    const deletefromStore = async (id) => {
        const response = await api.delete(`requestedBooks/${id}`);
    }
    //function that check if it not found in json
    const addBookHandler = async (id, name, img, author, price) => {
        const book = {
            name: name,
            imgUrl: img,
            author: author,
            price: price
        }
        const request = {
            id: id,
            ...book
        }
        const response = await api.post("/books", request);
        if (response) {
            deletefromStore(id);
            // window.location.reload(false);
            alert("Added Succefully");
            navigate('/Home');
        }
    }
    return (
        <>
            <br />
            <center>
                <br />
                <h1>&nbsp;</h1>
            </center>
            <div className='card-deck'>
                {books.map((book, index) => (
                    <div key={index} >
                        <div className='column'>
                            <div className="card d-flex flex-column" style={{ width: "180px", height: "350px" }}>
                                <img src={book.img} className='card-img' style={{ width: "160px", height: "170px" }} />
                                <div className='card-body'>
                                    <h6 className='card-title'>{book.name}</h6>
                                    <p className='text-primary font-weight-bolder'>By:{book.author}</p>
                                    <p className='text-danger'>Price:{book.price}$</p>
                                    {/* <Link to={`/Details/${book.id}`}>
                            <div className="mt-auto p-1">
                            <button  className='btn btn-outline-info'>Details</button>
                            </div>
                        </Link> */}
                                    {/* addhandler for books and then alert (added succefully) */}
                         <button className='btn btn-primary'
                                        onClick={() => 
                                        addBookHandler(book.id, book.name, book.img, book.author, book.price)}>Add</button>
                                        &nbsp;
                        <button className='btn btn-danger'
                                        onClick={() => 
                                           { deletefromStore(book.id); window.location.reload(false)}}
                                    >Delete</button>

                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>

    );
};