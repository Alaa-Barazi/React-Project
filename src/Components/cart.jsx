import { createContext, useState, useEffect } from "react";
import api from '../api/books';
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();
export function CartProvider(props) {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('username'));
    const retreiveallCart = async () => {
        const response = await api.get("/Cart");
        return response.data;
    }
    useEffect(() => {
        const getallCart = async () => {
            const allCart = await retreiveallCart();
            if (allCart) {
                setCart(allCart);
            }
        }
        getallCart();
    }, []);

    const newBook = async(id,nameB,imgUrlB,authorB,priceB,usernameB) =>{
        const find = cart.find(book=> book.id===id);
       console.log(user)
        if(find!=null){
            editBook(id,nameB,imgUrlB,authorB,priceB,(find.Qty+1));
        }
        else{
        const book = {
            id:id,
            name:nameB,
            imgUrl:imgUrlB,
            author:authorB,
            price:priceB,
            Qty:1,
            username:user
        }

        const response = await api.post('/Cart',book);
    }
    window.location.reload();
    }
    const deleteFromCart = async(id)=>{
        const response = await api.delete(`/Cart/${id}`);
    }
    const ExistsInCart = (id)=>{
        const find = cart.find(book=> book.id===id);
        if(find!=null) return find;
        return null;
    }
    const editBook = async (id,nameB,imgUrlB,authorB,priceB,QtyB,usernameB) =>{
       
        if(QtyB==0) {
            deleteFromCart(id);
        }
        else{
           
        const book = {
            id:id,
            name:nameB,
            imgUrl:imgUrlB,
            author:authorB,
            price:priceB,
            Qty:QtyB,
            username:user
        }
        const response = await api.put(`/Cart/${id}`,book);
        
    }
    window.location.reload();
    }
    const CartForUser = (username) =>{
        
        const UserCart = cart.filter(book => book.username === username);
        return UserCart;
    
    }
return (
    <CartContext.Provider value={{ cart,newBook,deleteFromCart,editBook,CartForUser,ExistsInCart }}>
        {props.children}
    </CartContext.Provider>


);

}