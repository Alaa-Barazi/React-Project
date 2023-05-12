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

function App() {
  return (
    <>
      <UserProvider>
        <Header />
       
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/EditBook" element={<EditBook />}>
            <Route path=":bookID" element={<EditBook />} />
          </Route>
          <Route path="/Details" element={<Details />}>
            <Route path=":bookID" element={<Details />} />
          </Route>
          <Route path="/Profile" element={<Profile />}/>
          <Route path="/EditProfile" element={<EditProfile/>}/>
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/" element={<Store />} />
          <Route path="/Home" element={<Store />} />
          {/* <Route path="/Header" element={Header} /> */}
          {/* <Route path="*" element={<NotFound />} />
        <Route path="*" element={ <NotFound />}/> */}
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
