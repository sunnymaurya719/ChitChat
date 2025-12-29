import { useState } from "react";
import { createContext , useContext} from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({children}) => {

    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([]);
    const [selectedUser,setSelectedUser] = useState(null);
    const [unseenMessages,setUnseenMessages]  = useState({});
    const [loadingMessages, setLoadingMessages] = useState(false);

    const {socket,axios} = useContext(AuthContext);

    //function to get all users for sidebar
    const getUsers = async () =>{
        try{
            const response = await axios.get("/api/messages/users");
            if(response.data.success){
                setUsers(response.data.users);
                setUnseenMessages(response.data.unseenMessages);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    //function to get messages for selected user
    const getMessages = async(userId) => {
        setLoadingMessages(true);
        setMessages([]);
        try{
            const response = await axios.get(`/api/messages/${userId}`);
            if(response.data.success){
                setMessages(response.data.messages);
                setLoadingMessages(false);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    //Function to send message to selected User
    const sendMessage = async(messageData)=>{
        try{
            const response = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData);
            if(response.data.success){
                setMessages((prevMessages)=> [...prevMessages,response.data.newMessage]);
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    //function to subscribe to messages for selected user
    const subscribeToMessages = async()=>{
        if(!socket) return;
        socket.on("newMessage",(newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages,newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            }else{
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,[newMessage.senderId]:prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] +1 :1
                }))
            }
        })
    }

    //function to unsubscribe from messages
    const unsubscribeFromMessages = ()=> {
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    },[socket,selectedUser]);

    const value = {
        messages,users,selectedUser,getUsers,getMessages,sendMessage,setSelectedUser,unseenMessages,setUnseenMessages,loadingMessages
    }

    return(
        <ChatContext.Provider value={value}>
            { children }
        </ChatContext.Provider>
    )
}