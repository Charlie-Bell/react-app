import React from 'react'
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { SocketContext } from "../context/socket";

function Home() {
  const socket = useContext(SocketContext);
  console.log(socket)

  // Declare posts state as an empty list.
  const [posts, setPosts] = useState([]);

  // useEffect hook to perform console.log(response) whenever axios.get(...) is called
  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  useEffect(()=> {
    socket.on('connect', () => { 
      console.log('Connected!');
    });
  }, [socket]);
  
  useEffect(()=> {
    socket.on('Test', data => {
      console.log(data);
      console.log("Test status:")
      console.log(socket)
      console.log("Test status end.")
    });
  }, [socket]);

  useEffect(() => {
    socket.on('newPosts', newPosts => {
      // Listen for the 'newPosts' event from the server
      console.log("Refreshing posts!")
      setPosts((prevPosts) => [...prevPosts, newPosts]);
    });
  }, [socket]);

  return (
    <div>
      { posts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        ); 
      }) }
    </div>
  )
}

export default Home