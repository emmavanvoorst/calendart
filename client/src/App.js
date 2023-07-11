import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import HomePage from "./HomePage";
import AddEvent from "./AddEventPage";
import Events from "./AllEventsPage";
import GlobalStyle from "./components/context/GlobalStyle";
import AboutPage from "./AboutPage";
import EditEventPage from "./EditEventPage";

const Container = styled.div`
`;

function App() {
  return (
    <Router>
        <GlobalStyle />
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/edit/:eventId" element={<EditEventPage/>}/>
          </Routes>
    </Router>
  );
}

export default App;
