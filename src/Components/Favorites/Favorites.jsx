import { useState, useEffect } from 'react'
import api from './../../api/books';
import Book from '../Book/Book';
import { Link,useNavigate } from "react-router-dom";
export default function Favorites(){
    const [fav,setFavs] = useState([]);
    const user = JSON.parse(localStorage.getItem('username'));
    const [userFav,setUserfav] = useState([]);
    const navigate = useNavigate();
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
       const handleClick = async (bookID) => {
        const foundBook = fav.find((book) => book.bookId === bookID && book.username === user);
               const response = await api.delete(`/favorites/${foundBook.id}`);
              
               
           let count = parseInt(localStorage.getItem('fav'));
           count--;
           localStorage.setItem('fav', JSON.stringify(count));
           navigate('/Home');
          
       }
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
                     <div className='column '>
                <div className="card d-flex flex-column" style={{width:"180px",height:"310px"}}>
                    <center>
                     {user!=null &&    <button style={{float:"right",width:"50px",height:"30px",backgroundColor:"transparent",fontSize:"15px"}}
                        onClick={()=>handleClick(book.bookId)} >
                    
                       <span>🧡</span>
                       </button> }
                    <img src={book.imgUrl} className='card-img' style={{zIndex:"-1",width:"150px",height:"150px"}} />
                    </center>
                    <div className='card-body'>
                        <h6 className='card-title'>{book.name}</h6>
                        
                    
                      
                        
                        <div className="btn-group m-1 btn-group-md ">
                      <Link to={`/Details/${book.id}`}
                        className="btn btn-outline-info rounded">
                        Details
                      </Link>
                      &nbsp;
                      {user!=null &&
                      <button  className="btn btn-outline-success rounded"
                      onClick={()=>newBook(book.id,book.name,book.imgUrl,book.author,
                        book.price,user)}>Cart</button>
                    }
                    </div>
                  </div>
                    

                </div>
            </div>
                     
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