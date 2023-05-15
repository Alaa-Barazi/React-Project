import './style.css';
import { Route, Routes, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
export default function Book({ book }) {

    return (
        <>
            <div className='column '>
                <div className="card d-flex flex-column" style={{width:"180px",height:"270px"}}>
                    <center>
                    <img src={book.imgUrl} className='card-img' style={{width:"150px",height:"150px"}} />
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