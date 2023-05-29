import React, { useEffect, useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../cart';
import { useNavigate,Link } from "react-router-dom";
export default function Cart(){
    const {cart,newBook,deleteFromCart,editBook,CartForUser,ExistsInCart} = useContext(CartContext);
    const [total, setTotal] = useState('');
    const [count, setCount] = useState('');
    const user = JSON.parse(localStorage.getItem('username'));
    const [currentCart,setCurrent] = useState([]);
   const navigate = useNavigate();
    let filtered = cart.filter(book => book.username === user);;
  const calcTotal = (all)=>{
    let sum=0;
    all.map((book)=>{
        sum+=((Number)(book.price)*(book.Qty));
    })
    return sum;
  }
  // if(!localStorage.getItem("count"))
  // localStorage.setItem("count",0);
  const calcCount = (all)=>{
    let cnt=0;
    all.map((book)=>{
        cnt+=book.Qty;
    })
    return cnt;
   
  }
  
 useEffect(()=>{
    const TheCart = CartForUser(user);
    setCurrent(TheCart);
 },[]);
useEffect(()=>{
    setCount(calcCount(filtered));
    setTotal(calcTotal(filtered));
    if(localStorage.getItem('count')===" ")      
      localStorage.setItem('count', 0);


},[cart])
  return (
    <>              
<div className="left" style={{width:"100px"}}> 
    <p className="text-black bg-info rounded" > Total : {total}$ </p>
    <p className="text-black bg-warning rounded"> Items : {count} </p>
    </div>
    <br/>
    <div className="cardDeck" style={{ display: "flex", flexWrap: "wrap" }}>
      {filtered.map((book,index) => {
              return (
                <div className='column' key={index}>
                <div className="card d-flex flex-column" style={{width:"200px",height:"380px"}}>
                    <center>
                    <img src={book.imgUrl} className='card-img' style={{zIndex:"-1",width:"150px",height:"150px"}} />
                    </center>
                    <div className='card-body'>
                        <h6 className='card-title'>{book.name}</h6>
                         
                         <p className='text-danger'>Price:{book.price}$</p>
                         <p className="text-info">Qty :{book.Qty}</p>
                        <div className="col-md-0">
                    <div className=" btn-group-sm ">
                    <Link to={`/Details/${book.id}`}>
                            <div className="mt-auto p-1">
                            <button  className='btn btn-outline-info'>Details</button>
                            </div>
                        </Link>
                      &nbsp;
                      <button  className='btn btn-outline-danger'
                       onClick={()=>editBook(book.id,book.name,book.imgUrl,book.author,
                        book.price,(book.Qty-1),book.username)}
                      >Delete 1</button>
                      &nbsp;
                      <button  className='btn btn-outline-success'
                      onClick={()=>editBook(book.id,book.name,book.imgUrl,book.author,
                        book.price,(book.Qty+1),book.username)}
                      >Add 1</button>
                    </div>
                  </div>
                    </div>
                </div>
            </div>
              );
            })}
      </div>
     

    </>
  );
}