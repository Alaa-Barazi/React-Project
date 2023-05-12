import { createContext, useState, useEffect } from "react";
import api from '../api/books';
import uuid from "uuid4";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();
export function UserProvider(props) {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const retreiveallUsers = async () => {
        const response = await api.get("/users");
        return response.data;
    }
    useEffect(() => {
        const getallUsers = async () => {
            const allUsers = await retreiveallUsers();
            if (allUsers) {
                setUsers(allUsers);
            }
        }
        getallUsers();
    }, []);

    const notFound = (username, password) => {
        let found = users.find(user => user.username === username && user.password !== password);
        let found2 = users.find(user => user.username === username && user.password === password);
        if (found) {
            alert("Username in use");
            return false;
        }
        else if (found2) {
            alert("User already Exists");
            return false;
        }
        return true;

        //if user found withh differnet password alert username booked
        // else if both the same alert user already exists

    }
    
    const trueInputs = (username, password) => {
       
        let found = users.find(user => user.username === username && user.password === password);
        if (found){
            let img = found.imgURL;
            localStorage.setItem('username', JSON.stringify(username));
            localStorage.setItem('password', JSON.stringify(password));
            localStorage.setItem('img', JSON.stringify(img));
            localStorage.setItem('id', JSON.stringify(found.id));
            localStorage.setItem('blogs', JSON.stringify(found.blogs));
            navigate("/Home");
        }
        else
            alert("User Not Found");

    }
    const editUser = async (username,password,imgUrl,blogs,id) => {
        const theUser = {
            id:id,
            username: username,
            password: password,
            imgURL: imgUrl,
            blogs: blogs
        }
        localStorage.setItem('username', JSON.stringify(username));
        localStorage.setItem('img', JSON.stringify(imgUrl));
        const response = await api.put(`/users/${id}`, theUser);
       

    }
    const createUser = async (username, password, img) => {
        if (notFound(username)) {
            const user = {
                id: uuid(),
                username: username,
                password: password,
                imgURL, img,
                blogs:0
            }
            const response = await api.post("/users", user);
            if (response) {
                alert("added succefully!");
                navigate("/Login");
            }
            else {
                alert("Failed, try again!")
            }
        }
    }
    return (
        <UserContext.Provider value={{ users, createUser, editUser, trueInputs }}>
            {props.children}
        </UserContext.Provider>
    );
}