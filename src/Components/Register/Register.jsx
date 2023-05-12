import './styleRegister.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../users';
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
    const [name,setName] = useState("");
    const [password,setPass] = useState("");
    const [password2,setPass2] = useState("");
    const [img,setImg] = useState("");
    const { users, createUser, editUser, trueInputs } = useContext(UserContext);
    const navigate=useNavigate();
    const isValidName = (name) => {
        const regex = /^[a-zA-Z ]+$/; // Match letters and spaces only
        return regex.test(name);
      }
    const validation = ()=>{
            if (!isValidName(name)) {
                alert('Name is invalid only letters');
                return false;
              }
            if (password.length < 6) {
              alert('Password must be at least 6 characters');
              return false;
            }
            if (password !== password2) {
             alert('Passwords do not match');
             return false;
            }
           return true;
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        // let user = {
        //     id:uuid4(),
        //     username: name,
        //     password:password,
        //     imgURL:img
        // }
        
        if(validation()){
            createUser(name,password,img);
            navigate('/Login');
        }
    }
    return (
        <div className="main">
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form  className="register-form"  onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <input required type="text" name="name" id="name" placeholder="Your Name" 
                                    value={name}
                                     onChange={(e)=>setName(e.target.value)}
                                    
                                    />
                                    {name.length==0 && <span className='text-danger bold'>Enter Valid Name</span>}
                                </div>
                                <div className="form-group">
                                    <input type="text" name="img" id="img" placeholder="Your Profile Img URL" 
                                    
                                    value={img}
                                    onChange={(e)=>setImg(e.target.value)}
                                    />
                                  
                                </div>
                                <div className="form-group">
                                    <input required type="password" name="pass" id="pass" placeholder="Password" 
                                     value={password}
                                     onChange={(e)=>setPass(e.target.value)}
                                    
                                    />
                                     {password.length==0 && <span className='text-danger bold'>Enter Valid Password</span>}
                                </div>
                                <div className="form-group">
                                    <input required type="password" name="re_pass" id="re_pass" placeholder="Repeat your password"
                                    value={password2}
                                    onChange={(e)=>setPass2(e.target.value)}
                                    />
                                    {(password2.length==0 || password2!=password) && <span className='text-danger bold'>Enter Password As Before</span>}

                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                                </div>
                            </form>
                        </div>
                        <div className="signup-image">
                            <figure><img src="https://th.bing.com/th/id/OIP.det8Tl1YoKPw04e5vETggAAAAA?pid=ImgDet&w=294&h=314&rs=1" alt="sing up image" /></figure>
                            <Link to={"/Login"}>

                                <button className='btn signup-image-link' style={{ float: "right" }}>I am already member <span>&#x27AD;</span> </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}