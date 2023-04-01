import "./App.css";
import Nav from "./Components/Nav";
import Button from "@mui/material/Button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        {/* can also put icon in button  "start" or "end" icon 
       which places it at beginning or end of button*/}
        <h1>The Daily Howl</h1>
      </header>
    </div>
  );
}

export default App;
