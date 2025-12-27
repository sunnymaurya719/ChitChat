import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import {io} from "socket.io-client";
import { data } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = BACKEND_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children}) =>{
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [authUser,setAuthUser] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const [socket,setSocket] = useState(null);

    //Check if user is authenticated and if so, set the user data and connect the socket
    const checkAuth = async() =>{
        try{
            const response = await axios.get("/api/auth/check");
            if(response.data.success){
                setAuthUser(response.data.user);
                connectSocket(response.data.user);
            }
        }catch(error){
            console.log("Error while checking auth :",error);
            toast.error("Error while checking Authentication : "+ error.message)
        }
    }

    //Login function to handle user authentication and socket connection
    const login = async(state,credentials) => {
        try{
            const response = await axios.post(`/api/auth/${state}`,credentials);
            if(response.data.success){
                setAuthUser(response.data.userData);
                connectSocket(response.data.userData);
                axios.defaults.headers.common["token"] = response.data.token;
                setToken(response.data.token);
                localStorage.setItem("token",response.data.token);
                toast.success(response.data.message);
            }else{
                toast.error(response.data.message);
            }
            
        }catch(error){
            toast.error("Error while login : "+ error.message);
        }
    }

    //Logout function to handle user logout and socket disconnection
    const logout = async() =>{
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successfully");
        socket.disconnect();
    }

    //Update profile function to handle user profile updates
    const updateProfile = async(body)=>{
        try{
            const response = await axios.put("/api/auth/update-profile",body);
            if(response.data.success){
                setAuthUser(response.data.user);
                toast.success("Profile updated successfully");
            }
        }catch(error){
            toast.error("Error while updating profile : "+error.message);
        }
    }

    //Connect socket function to handle socket connection and online users updates
    const connectSocket = (userData)=>{
        if(!userData || socket?.connected) return;
        const newSocket= io(BACKEND_URL, {
            query:{
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUsers(userIds)
        });
    }

    useEffect(()=>{
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    },[]);

    const value = {
        axios,authUser,onlineUsers,socket,login,logout,updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}