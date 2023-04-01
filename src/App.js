import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import Nav from "./Components/Nav";
import HomePage from "./Components/HomePage";
import Beagle from "./beagle.jpeg";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginForm />} />
          </Routes>
          <img src={Beagle} className="main-photo" alt="dog" />
        </header>
      </div>
    </Router>
  );
}

export default App;
