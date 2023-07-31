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

    socket.on('newPosts', newPosts => {
      // Listen for the 'newPosts' event from the server
      console.log("Refreshing posts!")
      setPosts(newPosts);
    });
  }, [socket]);

  return (
    <div>
      { posts.map((value, key) => {
        return (
          <div className="post">
            <div className="comment"><div className='body'>{value.comment}</div></div>
            <div className="reply"><div className='body'>{value.reply}</div></div>
          </div>
        ); 
      }) }
    </div>
  )
}

export default Home