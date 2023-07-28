import './App.css';
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // Declare posts state as an empty list.
  const [posts, setPosts] = useState([]);

  // useEffect hook to perform console.log(response) whenever axios.get(...) is called
  useEffect(() => {
    axios.get("http://localhost:8080/posts").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="App">
      { posts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.post_text}</div>
            <div className="footer">{value.username}</div>
          </div>
        ); 
      }) }
    </div>
  );
}

export default App;
