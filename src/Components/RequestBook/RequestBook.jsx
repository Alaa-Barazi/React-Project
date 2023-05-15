import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/books';
import  uuid  from  "uuid4";
export default function RequestBook(){
    const [name,nameChange] = useState("");
    const [author,authorChange] = useState("");
    const [img,imgChange] = useState("");
    const [price,priceChange] = useState("");
    const [allbooks, setAllBooks] = useState([]);
    const navigate=useNavigate();
    const HandleSubmit =()=>{
        addBookHandler();
        navigate("/Home");
    }
    useEffect(()=>{
      const getAllOtherBooks = async () =>{
        const others= await api.get("/books");
        if(others) setAllBooks(others.data);
    }
   
    getAllOtherBooks();
    },[])
    const notExists = (name, author) => {
      return !allbooks.some((book) =>
        book.name.toLowerCase().trim() === name.toLowerCase().trim() &&
        book.author.toLowerCase().trim() === author.toLowerCase().trim()
      );
    };
    const addBookHandler = async() =>{
     if(notExists(name,author)){
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
      else{
        alert("Book already exists");
      }
    }
    return (
        <form onSubmit={HandleSubmit} className="container-fluid vh1-00" style={{ marginTop: "50px" ,width:"600px",textAlign:"left"}}>
        <div>
            <h2>Add New Book</h2>
          <div className="form-group col-md-18" >
            {/* <label htmlFor="inputName" >Name</label>  */}
            <input required type="text" className="form-control" 
            value={name} onChange={(e)=>nameChange(e.target.value)}
            placeholder='Name'
            />
           { name.length==0 && <span className='text-danger'> Enter name</span>}
          </div>
          <div className="form-group col-md-18">
            {/* <label htmlFor="inputPassword4">Author</label> */}
            <input type="text" className="form-control" 
             value={author} onChange={(e)=>authorChange(e.target.value)}
            placeholder='Author'
            />
             { author.length==0 && <span className='text-danger'> Enter author</span>}
          </div>
        </div>
        <br/>
        <div className="form-group col-md-18">
          {/* <label htmlFor="inputAddress">Img</label> */}
          <input type="text" className="form-control" 
           value={img} onChange={(e)=>imgChange(e.target.value)}
           placeholder="Img URL"
          />
        </div>
        <div className="form-group col-md-18">
          {/* <label htmlFor="inputAddress2">Price</label> */}
          <input type="text" className="form-control" id="inputAddress2" placeholder="Price$$"
           value={price} onChange={(e)=>priceChange(e.target.value)}
          />
          { price<=0 && <span className='text-danger'> Enter valid price</span>}
        </div>
       
       
        <button type="submit" className="btn btn-primary">Add</button>
        <Link to="/" className='btn btn-danger'>Back</Link>
      </form>
    )
}