import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

import Store from './Components/Store/Store';
import { Route, Routes } from 'react-router-dom';
import Details from './Components/Details/Details';
import EditBook from './Components/EditBook/EditBook';
import AddBook from './Components/AddBook/AddBook';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { UserProvider } from './Components/users';
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/EditProfile/EditProfile';
import NewBlog from './Components/NewBlog/NewBlog';
import { BlogProvider } from './Components/blogs';
import Blogs from './Components/Blogs/Blogs';
import DeleteBlog from './Components/deleteBlog/deleteBlog';
import RequestBook from './Components/RequestBook/RequestBook';
import AllRequests from './Components/AllRequests/AllRequests';
import Favorites from './Components/Favorites/Favorites';
import Cart from './Components/Cart/Cart';
import { CartProvider } from './Components/cart';
import EditBlog from './Components/EditBlog/EditBlog';

function App() {
  return (
    <>
    
      <UserProvider>
        <BlogProvider>
          <CartProvider>
          <Header />

          <Routes>
            <Route path="/RequestBook" element={<RequestBook />} />
            <Route path="/AllRequests" element={<AllRequests/>}/>
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/EditBook" element={<EditBook />}>
              <Route path=":bookID" element={<EditBook />} />
            </Route>
            <Route path="/Details" element={<Details />}>
              <Route path=":bookID" element={<Details />} />
            </Route>
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/Favorites" element={<Favorites />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/AddBook" element={<AddBook />} />
            <Route path="/newBlog" element={<NewBlog />} />
            <Route path="/Blogs" element={<Blogs />} /> 
            <Route path="/EditBlog" element={<EditBlog />} >

              <Route path=":blogID" element={<EditBlog />}/>
            </Route>
            
              <Route path="/DeleteBlog" element={<DeleteBlog />}>
              <Route path=":blogID" element={<Details />} />

              
            {/* <Route path="DeleteBlog/:blogID" element={<DeleteBlog />} /> */}

            </Route>
            <Route path="/" element={<Store />} />
            <Route path="/Home" element={<Store />} />
            {/* <Route path="/Header" element={Header} /> */}
            {/* <Route path="*" element={<NotFound />} />
        <Route path="*" element={ <NotFound />}/> */}
          </Routes>
          </CartProvider>
        </BlogProvider>
      </UserProvider>
    </>
  );
}

export default App;
