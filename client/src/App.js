import './App.css';
import Home from "./pages/Home";
import CreatePost from './pages/CreatePost';
import {SocketContext, socket} from './context/socket';

function App() {
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Home />
          </div>
          <div className="col-md-3">
            <CreatePost />
          </div>
        </div>
      </div>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
