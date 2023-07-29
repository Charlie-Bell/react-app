import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
