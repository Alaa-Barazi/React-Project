import './style.css';
import { Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import uuid from "uuid4";
import { useState,useEffect } from 'react';
import api from './../../api/books';
export default function Book({ book }) {
    const [fav,setFav] = useState([]);
    const user = JSON.parse(localStorage.getItem('username'));
    const retreiveallFavs = async () => {
        const response = await api.get("/favorites");
        return response.data;
    }
    useEffect(() => {
        const getallFavs = async () => {
            const allFavs = await retreiveallFavs();
            if (allFavs) {
                setFav(allFavs);
            }
        }
        getallFavs();
    }, []);
    const inFavprites = (bookID) =>{
        let icon = "🤍";
        fav.map((book)=>{
            if(book.bookId === bookID && book.username === user){ 
                icon="🧡";
            
            }
        });
        return icon;
    }
    const handleClick = async (bookID) => {
            const favorite = {
                id:uuid(),
                bookId:bookID,
                username:user
            }
        const response = await api.post('/favorites',favorite);
     if(response){
        window.location.reload();
      }
    }
    return (
        <>
            <div className='column '>
                <div className="card d-flex flex-column" style={{width:"180px",height:"300px"}}>
                    <center>
                        <button style={{float:"right",width:"50px",height:"30px",backgroundColor:"transparent",fontSize:"15px"}}
                        onClick={()=>handleClick(book.id)} >
                       <span> {inFavprites(book.id)} </span>
                       </button>
                    <img src={book.imgUrl} className='card-img' style={{zIndex:"-1",width:"150px",height:"150px"}} />
                    </center>
                    <div className='card-body'>
                        <h6 className='card-title'>{book.name}</h6>
                        {/* <p className='text-primary font-weight-bolder'>By:{book.author}</p> */}
                        {/* <p className='text-danger'>Price:{book.price}$</p> */}
                        <Link to={`/Details/${book.id}`}>
                            <div className="mt-auto p-1">
                            <button  className='btn btn-outline-info'>Details</button>
                            </div>
                        </Link>
                  
                    </div>

                </div>
            </div>
        </>
    )
}