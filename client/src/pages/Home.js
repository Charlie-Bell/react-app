import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

function Home() {
  // Declare posts state as an empty list.
  const [posts, setPosts] = useState([]);

  // useEffect hook to perform console.log(response) whenever axios.get(...) is called
  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    // Establish a WebSocket connection to the server
    const socket = io('http://localhost:8080/posts');

    // Listen for the 'newPosts' event from the server
    socket.on('newPosts', (newPosts) => {
      // Update the state with the new data
      setPosts((prevPosts) => [...prevPosts, newPosts]);
    });

    // Clean up the WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

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