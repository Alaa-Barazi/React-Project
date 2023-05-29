import { useState, useEffect } from 'react'
import api from './../../api/books';
import Book from '../Book/Book';
import { Link } from "react-router-dom";
export default function Favorites(){
    const [fav,setFavs] = useState([]);
    const user = JSON.parse(localStorage.getItem('username'));
    const [userFav,setUserfav] = useState([]);
    const retreiveallFavs = async () =>{
        const response = await api.get("/favorites");
        return response.data;
       }
       if(!localStorage.getItem("fav"))
             localStorage.setItem("fav",0);
useEffect(() => {
   const getAllFavs = async ()=>{
    const allBooks = await retreiveallFavs();
    if(allBooks){
        setFavs(allBooks);
    }
   }
   getAllFavs();
   
   
       }, []);
       let cutomFavs = fav.filter((book)=>book.username===user);
      const setChanged = ()=>{
        fav.map((book)=>{
            if(book.username=== user){
                //userFav.push(book);
                setUserfav([...userFav,book]);
            }
        })
      }
    
       return (
        <>
        <br/>
        <center>
            <br/>
            <h1>&nbsp;</h1>
            </center>
            <div className='card-deck'>
            {cutomFavs.map((book,index) => (
                <div key={index} >
                     <Book book={book}  /> 
                </div>
            ))}
            </div>
            </>
        // <>
        // {fav.map((favBook)=>{ 
        //     <>
     
        //     <div className='column'>
        //         <div className="card d-flex flex-column" style={{width:"180px",height:"300px"}}>
        //             <center>
        //                 {/* <button style={{float:"right",width:"50px",height:"30px",backgroundColor:"transparent",fontSize:"15px"}}
        //                 onClick={()=>handleClick(book.id,book.imgUrl)} >
                    
        //             </button> */}
        //             <span>{favBook.icon}</span>
        //             <img src={favBook.imgUrl} className='card-img' style={{zIndex:"-1",width:"150px",height:"150px"}} />
        //             </center>
        //             <div className='card-body'>
        //                 {/* <p className='text-primary font-weight-bolder'>By:{book.author}</p> */}
        //                 {/* <p className='text-danger'>Price:{book.price}$</p> */}
        //                 <Link to={`/Details/${favBook.bookId}`}>
        //                     <div className="mt-auto p-1">
        //                     <button  className='btn btn-outline-info'>Details</button>
        //                     </div>
        //                 </Link>
                  
        //             </div>

        //         </div>
        //     </div>
        //     </>
        // })};
            
        // </>
            
   );
}