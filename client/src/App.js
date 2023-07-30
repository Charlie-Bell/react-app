import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import {SocketContext, socket} from './context/socket';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
      <div className="container">
        <div className="row">
          <div className="col-md-1">
            <Home />
          </div>
          <div className="col-md-1">
            <CreatePost />
          </div>
        </div>
      </div>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
