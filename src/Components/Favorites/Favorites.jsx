import { useState, useEffect } from 'react'
import api from './../../api/books';
import Book from '../Book/Book';
import { Link } from "react-router-dom";
export default function Favorites(){
    const [fav,setFavs] = useState([]);
    const retreiveallFavs = async () =>{
        const response = await api.get("/favorites");
        return response.data;
       }
useEffect(() => {
   const getAllFavs = async ()=>{
    const allBooks = await retreiveallFavs();
    if(allBooks){
        setFavs(allBooks);
    }
   }
   getAllFavs();
       }, []);
      
       return (
        <>
        <br/>
        <center>
            <br/>
            <h1>&nbsp;</h1>
            </center>
            
            <div className='card-deck'>
            {fav.map((book,index) => (
                <div key={index} >
                     <Book book={book} icon={book.icon} /> 
                     
                </div>
            ))}
            </div>
            </>
            
   );
}