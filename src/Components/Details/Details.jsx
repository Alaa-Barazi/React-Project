import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api from './../../api/books';
import 'bootstrap/dist/css/bootstrap.css';

export default function Details({ setBooks }) {
    const { bookID } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({});
    const username = JSON.parse(localStorage.getItem('username'));
    const retrieveBook = async () => {
        const response = await api.get(`/books/${bookID}`);
        return response.data;
    };

    useEffect(() => {
        const getBook = async () => {
            const bookData = await retrieveBook();
            setBook(bookData);
        };

        getBook();
    }, []);

    const removeBookHandler = () => {
        remove();
        alert("ok")
        navigate("/Home");
    }
    const remove = async () => {
        await api.delete(`/books/${bookID}`);

    }
    return (
        <>

            <div className="container-fluid vh-100" style={{ marginTop: "50px" }}>
                <div className="" style={{ marginTop: "200px" }}>
                    <div className="rounded d-flex justify-content-center">
                        <div className="col-md-4 col-lg-8 shadow-lg p-5 bg-light">
                            <div className="text-center">
                                <h3 className="text-primary">Book Details</h3>
                            </div>
                            <div className="p-4">
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary"><i
                                        className="bi bi-person-plus-fill text-white"></i> </span>
                                          <input type="text" className="form-control"  value={book.name} readOnly></input>
                                        
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary"><i
                                        className="bi bi-person-plus-fill text-white"></i> </span>
                                          <input type="text" className="form-control"  value={`By: ${book.author}`} readOnly></input>
                                        
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text bg-primary"><i
                                        className="bi bi-person-plus-fill text-white"></i> </span>
                                          <input type="text" className="form-control"  value={`${book.price}$`} readOnly></input>
                                        
                                </div>
                                <Link to="/" className="btn btn-primary">
                        Back </Link>
                        {username==='Admin' && <>
            <button className="btn btn-danger" onClick={() => removeBookHandler()}>Delete</button>
            <Link to={`/EditBook/${bookID}`} className="btn btn-success">
                Edit
            </Link>
            </>   }
                            </div>
                        </div>
                        <div className="col-md-5 d-sm-none d-md-block">
                            <img src={book.imgUrl}
                                className="d-block w-100 img-fluid" alt="image" />
                        </div>
                        
                    </div>
                </div>
            </div>
            



        </>



    );
}
