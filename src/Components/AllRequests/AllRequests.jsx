import { useState, useEffect } from 'react'
import api from './../../api/books';
import Book from '../Book/Book';
import { Link } from "react-router-dom";
import './style.css'
export default function AllRequests(){
    const [books,setBooks] = useState([]);
    const retreiveallBooks = async () =>{
        const response = await api.get("/requestedBooks");
        return response.data;
       }
useEffect(() => {
   const getAllBooks = async ()=>{
    const allBooks = await retreiveallBooks();
    if(allBooks){
        setBooks(allBooks);
    }
   }
   getAllBooks();
       }, []);
       const addBookHandler = async(name,img,author,price) =>{
        const book={
        name:name,
        img:img,
        author:author,
        price:price
        }
        const request ={
            id:uuid(),
            ...book
        }
        const response =await api.post("/requestedBooks",request);
    }
   // const deletefromStore = as
       return (
        <>
        <br/>
        <center>
            <br/>
            <h1>&nbsp;</h1>
            </center>
            <div className='card-deck'>
            {books.map((book,index) => (
                <div key={index} >
                    <div className='column'>
                <div className="card d-flex flex-column" style={{width:"180px",height:"280px"}}>
                    <img src={book.img} className='card-img' style={{width:"150px",height:"150px"}} />
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
                        <button className='btn btn-outline-info'
                        
                        onClick={()=>addBookHandler(book.name,book.img,book.author,book.price)}
                        
                        >Add to store</button>

                    </div>

                </div>
            </div> 
                </div>
            ))}
            </div>
            </>
            
   );
};