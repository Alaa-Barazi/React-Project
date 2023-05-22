import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
export default function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('username'));
  const psw = JSON.parse(localStorage.getItem('password'));
  const img = JSON.parse(localStorage.getItem('img'));
  const logOut = () => {
    localStorage.setItem('username', JSON.stringify(null));
    localStorage.setItem('password', JSON.stringify(null));
    localStorage.setItem('img', JSON.stringify(null));
    localStorage.setItem('id', JSON.stringify(null));
    setShowDropdown(false);
  }
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg  navbar-light" style={{ backgroundColor: "#e3f2fd", position: "fixed", top: "0", width: "100%", left: "0" }}>
        <a className="navbar-brand align-baseline" href="/Home">   <h3>The Store</h3></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <button className="btn rounded" onClick={() => navigate("/Home")}>Home</button>
            </li>
            <li className="nav-item">
            <button className="btn rounded" onClick={() => navigate("/Blogs")}>Blogs  </button>
            </li>
            {user != null &&
              <li className="nav-item">
              <button className='btn rounded' onClick={() => navigate("/Favorites")}>
              Favorites  </button>
              </li>
            }
            {user != null &&
              <li className="nav-item">
              <button className='btn rounded' onClick={() => navigate("/Cart")}>
              Cart  </button>
              </li>
            }
            {user != null &&
              <li className="nav-item">
              <button className='btn rounded' onClick={() => navigate("/newBlog")}>
              New Blog  </button>
              </li>
            }
            {user === 'Admin' && <li className="nav-item" style={{ float: "right" }}>
              <Link to={"/AllRequests"}>
                <button className='btn rounded' >AllRequests </button>
              </Link>
            </li>
            }
            {user === 'Admin' && <li className="nav-item" style={{ float: "right" }}>
              <Link to={"/AddBook"}>
                <button className='btn btn-success rounded' >New Book <span>&#x2719;</span></button>
              </Link>
            </li>
            }
            {user !== 'Admin' && user != null &&
              <li className="nav-item" style={{ float: "right" }}>
                <Link to={"/RequestBook"}>
                  <button className='btn btn-success rounded' >Request Book <span>&#x2719;</span></button>
                </Link>
              </li>
            }
            <li>
              {user == null &&
                <Link to={"/Login"}>
                  <button className='btn btn-info' style={{ right: "0", position: "fixed" }}>Login <span>&#x27AD;</span></button>
                </Link>
              }
            </li>
            <li className="nav-item">
              {user != null &&
                <div className="profile-dropdown" style={{ right: "0", position: "fixed" }}>
                  <div className="profile-circle" onClick={toggleDropdown} >
                    <img
                      src={img}
                      alt="Profile Avatar"
                      style={{ width: "50px", height: "50px", borderRadius: "50%", float: "right", right: "0" }}
                    />
                  </div>
                  {showDropdown && (
                    <ul className="dropdown-menu ">
                      <Link to={"/Profile"}>
                        <li>
                          <button className='btn btn-primary'>Profile <span>&#x27AD;</span></button>
                        </li>
                      </Link>
                      <li>Settings</li>
                      <Link to={"/Login"}>
                        <li>
                          <button className='btn btn-danger' onClick={() => logOut()}>LogOut <span>&#x27AD;</span></button>
                        </li>
                      </Link>
                    </ul>
                  )}
                </div>
              }
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}