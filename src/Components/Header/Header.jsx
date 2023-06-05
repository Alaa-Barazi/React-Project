import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import api from './../../api/books';
import { CartContext } from '../cart';

export default function Header() {
  const navigate = useNavigate();
  let cnt = 0;
  let cnt2 = 0;
  const user = JSON.parse(localStorage.getItem('username'));
  const psw = JSON.parse(localStorage.getItem('password'));
  const img = JSON.parse(localStorage.getItem('img'));
  const logOut = () => {
    localStorage.setItem('username', JSON.stringify(null));
    localStorage.setItem('password', JSON.stringify(null));
    localStorage.setItem('img', JSON.stringify(null));
    localStorage.setItem('id', JSON.stringify(null));
    setShowDropdown(false);
    setNavbarOpen(false);
  }

  const [favs, setFavs] = useState([]);

  const retreiveallFavs = async () => {
    const response = await api.get("/favorites");
    return response.data;
  }
  let count = parseInt(localStorage.getItem('count'));
  let fav = parseInt(localStorage.getItem('fav'));
  useEffect(() => {
    const getAllFavs = async () => {
      const allBooks = await retreiveallFavs();
      if (allBooks) {
        setFavs(allBooks);
      }
    }
    getAllFavs();
  }, []);
  const { cart, newBook, deleteFromCart, editBook, CartForUser, ExistsInCart } = useContext(CartContext);
  const calc = () =>{
    favs.map((product) => {
      if (product.username === user) {
        cnt2++;
      }
    });
    cart.map((product) => {
      if (product.username === user) {
        cnt += product.Qty;
      }
    });
  }
  calc();
  localStorage.setItem('fav', cnt2);
  localStorage.setItem('count', cnt);
  count = parseInt(localStorage.getItem('count'));
  fav = parseInt(localStorage.getItem('fav'));

  
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const [navbarOpen, setNavbarOpen] = useState(false);
  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };
  const closeDropdown = () => {
    setShowDropdown(false);
  };
  return (
    <div>
 <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ backgroundColor: "#e3f2fd" }}>   
 <Link className="navbar-brand" to="/Home">
          <h3>The Store</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button className="btn rounded" onClick={() => { navigate("/Home"); closeNavbar(); }}>Home</button>
            </li>
            <li className="nav-item">
              <button className="btn rounded" onClick={() => { navigate("/Blogs"); closeNavbar(); }}>Blogs</button>
            </li>
            {user != null &&
              <li className="nav-item">
                <button className='btn rounded' onClick={() => { navigate("/Favorites"); closeNavbar(); }}>
                  Favorites
                  <span className="badge badge-secondary" style={{ color: "red" }}>
                    {fav}
                  </span>
                </button>
              </li>
            }
            {user != null &&
              <li className="nav-item">
                <button className='btn rounded' onClick={() => { navigate("/Cart"); closeNavbar(); }}>
                  Cart
                  <span className="badge badge-secondary" style={{ color: "red" }}>
                    {count}
                  </span>
                </button>
              </li>
            }
            {user != null &&
              <li className="nav-item">
                <button className='btn rounded' onClick={() => { navigate("/newBlog"); closeNavbar(); }}>
                  New Blog
                </button>
              </li>
            }
            {user === 'Admin' &&
              <li className="nav-item">
                <Link to={"/AllRequests"}>
                  <button className='btn rounded' onClick={closeNavbar}>AllRequests</button>
                </Link>
              </li>
            }
            {user === 'Admin' &&
              <li className="nav-item">
                <Link to={"/AddBook"}>
                  <button className='btn btn-success rounded' onClick={closeNavbar}>New Book <span>&#x2719;</span></button>
                </Link>
              </li>
            }
            {user !== 'Admin' && user != null &&
              <li className="nav-item">
                <Link to={"/RequestBook"}>
                  <button className='btn btn-success rounded' onClick={closeNavbar}>Request Book <span>&#x2719;</span></button>
                </Link>
              </li>
            }
            <li className="nav-item">
              {user == null &&
                <Link to={"/Login"}>
                  <button className='btn btn-info'>Login <span>&#x27AD;</span></button>
                </Link>
              }
            </li>
            <li className="nav-item">
        {user != null && (
          <div className="profile-dropdown">
            <div className="profile-circle" onClick={toggleDropdown}>
              <img src={img} alt="Profile Avatar" className="profile-pic" />
            </div>
            {showDropdown && (
              <ul className="dropdown-menu dropdown-menu-right show">
                <Link to={"/Profile"}>
                  <li>
                    <button className="btn btn-primary" onClick={closeDropdown}>
                      Profile <span>&#x27AD;</span>
                    </button>
                  </li>
                </Link>
               
                <Link to={"/Login"}>
                  <li>
                    <button className="btn btn-danger" onClick={() => { logOut(); closeDropdown(); }}>
                      LogOut <span>&#x27AD;</span>
                    </button>
                  </li>
                </Link>
              </ul>
            )}
          </div>
        )}
      </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
