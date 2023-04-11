import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import Nav from "./component/Nav";
import HomePage from "./pages/HomePage";
import PictureDisplay from "./pages/PictureDisplay";

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={!user ?<LoginForm /> : <Navigate to="/PictureDisplay" />}/>
            <Route exact path="/signup" element={!user ?<SignUpForm /> : <Navigate to="/PictureDisplay" />}/>
            <Route exact path="/search" element={user ? <PictureDisplay /> : <Navigate to="/" />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;