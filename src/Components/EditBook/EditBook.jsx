import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/books';
import uuid from "uuid4";
export default function EditBook() {
    const navigate = useNavigate();
    const { bookID } = useParams();
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [img, setImg] = useState("");
    const [price, setPrice] = useState("");
    const handleChange = (e) => {
        //e.preventDefault();
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "author":
                setAuthor(value);
                break;
            case "img":
                setImg(value);
                break;
            case "price":
                setPrice(value);
                break;
            default:
                break;
        }
    };

    const [book, setBook] = useState(null);
    const retrieveBook = async () => {
        const response = await api.get(`/books/${bookID}`);
        return response.data;
    };
   
    useEffect(() => {
        const getBook = async () => {
            const bookData = await retrieveBook();
            setBook(bookData)
         
           if(bookData){
            setName(bookData.name)
            setAuthor(bookData.author)
            setImg(bookData.imgUrl)
            setPrice(bookData.price)
           }

        };
        getBook();
    }, []);

    const HandlseSubmit = () => {
        updateBookHandler();
        navigate("/Home");
    }
    const updateBookHandler = async () => {
        const book = {
            id:bookID,
            name: name,
            imgUrl: img,
            author: author,
            price: price
        }
        const request = {
            id: uuid(),
            ...book
        }
        const response = await api.put(`/books/${bookID}`, request);
    }
    
    return (
        <>{book !=null &&
            
        <form onSubmit={HandlseSubmit} className="container-fluid vh1-00" style={{ marginTop: "50px" ,width:"600px",textAlign:"left"}}>
            <div>
            <div className="text-center">
                                <h3 className="text-primary">Edit Book</h3>
                            </div>
                <div className="form-group col-md-18">
                <pre className="text-primary" style={{fontWeight:"bold",fontSize:"18px"}}>Name</pre>

                    {/* <label htmlFor="inputEmail4">Name</label>  */}
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    />
                    {name != null && name.length == 0 && <span className='text-danger'> Enter name</span>}
                </div>
                <div className="form-group col-md-18">
                <pre className="text-primary" style={{fontWeight:"bold",fontSize:"18px"}}>Author</pre>
                    {/* <label htmlFor="inputPassword4">Author</label> */}
                    <input
                        type="text"
                        className="form-control"
                        name="author"
                        value={author}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-group col-md-18">
            <pre className="text-primary" style={{fontWeight:"bold",fontSize:"18px"}}>Img URL</pre>
                {/* <label htmlFor="inputAddress">Img</label> */}
                <input
                    type="text"
                    className="form-control"
                    name="img"
                    value={img}
                    onChange={handleChange}
                />
            </div>
           
            <div className="form-group col-md-18">
            <pre className="text-primary" style={{fontWeight:"bold",fontSize:"18px"}}>Price</pre>
            {/* <label htmlFor="inputAddress2" className="mr-sm-2">Price</label> */}
                <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    required
                />
                {price <= 0 && <span className='text-danger'> Enter valid price</span>}
            </div>

            <button onClick={() => navigate(-1)} className='btn btn-primary'>Back</button>
            <button className='btn btn-danger' >Update</button>

        </form>
       }</>
    )
}