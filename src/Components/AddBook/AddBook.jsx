import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/books';
import  uuid  from  "uuid4";
export default function AddBook(){
    
    const [name,nameChange] = useState("");
    const [author,authorChange] = useState("");
    const [img,imgChange] = useState("");
    const [price,priceChange] = useState("");
    const navigate=useNavigate();
    const HandlseSubmit =()=>{
        addBookHandler();
        navigate("/Home");
    }
    const addBookHandler = async() =>{
        const book={
        name:name,
        imgUrl:img,
        author:author,
        price:price
        }
        const request ={
            id:uuid(),
            ...book
        }
        const response =await api.post("/books",request);
      
    
    }
    return (
        <form onSubmit={HandlseSubmit} className="container-fluid vh1-00" style={{ marginTop: "50px" ,width:"600px",textAlign:"left"}}>
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