import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import SignUpForm from "./pages/SignUpForm";
import Nav from "./component/Nav";
import HomePage from "./pages/HomePage";
import PictureDisplay from "./pages/PictureDisplay";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/login" element={<LoginForm />} />
            <Route exact path="/signup" element={<SignUpForm />} />
            <Route exact path="search" element={<PictureDisplay/>}/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
