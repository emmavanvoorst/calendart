import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {styled} from "styled-components";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";


const Container = styled.div`
 background-color: darkseagreen;
 height: 100em;
`

function App() {
  return (
    <Router>
    <Container>
      <NavBar />
      <Routes>
      <Route path ="/" element = {<HomePage/>}/>
      </Routes>
    </Container>
    </Router>
  );
}

export default App;
