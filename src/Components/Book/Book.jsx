import './style.css';
import { Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import uuid from "uuid4";
import { useState,useEffect,useContext } from 'react';
import { CartContext } from '../cart';
import api from './../../api/books';
export default function Book({ book}) {
    const [fav,setFav] = useState([]);
    const {cart,newBook,deleteFromCart,editBook,CartForUser,ExistsInCart} = useContext(CartContext);

   
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
    const inFavorites =  (thebook) =>{
        fav.map((book)=> {
            if (book.bookId === thebook.id && book.username === user) {
               return book.id;
           }
        });
        return -1;
    }
    const ExistsInFavorites =  (thebook) =>{
        const foundBook = fav.find((book) => book.bookId === thebook.id && book.username === user);
        if(foundBook ) return "🧡";
        let icon="🤍";
             fav.map((book)=> {
                 if (book.bookId === thebook.id && book.username === user) {
                    icon="🧡";
                }
             });
            return icon;
    }    
    const foundInFavArr = () =>{
        const foundBook = fav.find((book) => book.bookId === book.id && book.username === user);
        return foundBook;
    }
    const handleClick = async (bookID,img) => {
    const foundBook = fav.find((book) => book.bookId === bookID && book.username === user);
        if(foundBook){
           const response = await api.delete(`/favorites/${foundBook.id}`);
        }
        else{
            const favorite = {
                id:uuid(),
                bookId:bookID,
                imgUrl:img,
                username:user,
                "icon":"🧡"
            }
        const response = await api.post('/favorites',favorite);
     if(response){
       window.location.reload();
      }
   }
    }
    const InCart = ()=>{

    }
    return (
        <>
            <div className='column '>
                <div className="card d-flex flex-column" style={{width:"180px",height:"310px"}}>
                    <center>
                     {user!=null &&    <button style={{float:"right",width:"50px",height:"30px",backgroundColor:"transparent",fontSize:"15px"}}
                        onClick={()=>handleClick(book.id,book.imgUrl)} >
                    
                       <span>{ExistsInFavorites(book)}</span>
                       </button> }
                    <img src={book.imgUrl} className='card-img' style={{zIndex:"-1",width:"150px",height:"150px"}} />
                    </center>
                    <div className='card-body'>
                        <h6 className='card-title'>{book.name}</h6>
                        {/* <p className='text-primary font-weight-bolder'>By:{book.author}</p> */}
                        {/* <p className='text-danger'>Price:{book.price}$</p> */}
{/* {foundInFavArr() &&   */}
                    
                      
                        
                        <div className="btn-group m-1 btn-group-md ">
                      <Link to={`/Details/${book.id}`}
                        className="btn btn-outline-info">
                        Details
                      </Link>
                      &nbsp;
                      <button  className="btn btn-outline-success rounded"
                      onClick={()=>newBook(book.id,book.name,book.imgUrl,book.author,
                        book.price,user)}>Cart</button>
                     
                    </div>
                  </div>
                    

                </div>
            </div>
        </>
    )
}