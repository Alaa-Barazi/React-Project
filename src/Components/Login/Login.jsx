import './styleLogin.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../users';
import { Link } from "react-router-dom";
export default function Login() {
  // get user with specific username if found okay go to store if not alert error and stay in the same page
  const [name,setName] = useState("");
  const [pass,setPass] = useState("");
  const { users, createUser, editUser, trueInputs } = useContext(UserContext);
  const handleSubmit = (event) =>{
    event.preventDefault();
    trueInputs(name,pass);
  }
 
  return (
    <>

      <div className='main'>
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure><img src="https://www.ciga-formation.com/images/signin-image.jpg" alt="sign up image" /></figure>
                <Link to={"/Register"}>

                  <button className='btn   signup-image-link' style={{ float: "right" }}>Create an account <span>&#x270D;</span> </button>
                </Link>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Sign in</h2>
                <form method="POST" className="register-form" id="login-form" onSubmit={handleSubmit}>
                  <div className="form-group">

                    <input type="text" name="your_name" id="your_name" placeholder="Your Name" 
                   
                     onChange={(e)=>setName(e.target.value)}
                    />
                    {name.length==0 && <span className='text-danger bold'>Enter Valid Name</span>}

                  </div>
                  <div className="form-group">

                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" 
                    
                     onChange={(e)=>setPass(e.target.value)}
                    />
                   {pass.length==0 && <span className='text-danger bold'>Enter Valid Password</span>}

                  </div>
                  <div className="form-group">
                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                    <label htmlFor="remember-me" className="label-agree-term"><span><span></span></span>Remember me</label>
                  </div>
                  <div className="form-group form-button">
                    <input type="submit" name="signin" id="signin" className="form-submit" value="Login" />
                  </div>
                </form>

              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}