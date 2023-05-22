import { useState, useEffect } from 'react'
import api from './../../api/books';
import Book from '../Book/Book';
import { Link } from "react-router-dom";
import './style.css'
export default function Store(){
    const [books,setBooks] = useState([]);
    const retreiveallBooks = async () =>{
        const response = await api.get("/books");
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
                     <Book book={book}  /> 
                </div>
            ))}
            </div>
            </>
            
   );
};