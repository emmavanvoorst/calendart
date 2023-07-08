import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import HomePage from "./HomePage";
import AddEvent from "./AddEventPage";
import Events from "./AllEventsPage";
import GlobalStyle from "./components/context/GlobalStyle";
import { UserProvider } from "./components/context/UserContext";

const Container = styled.div`
  background-color: darkseagreen;
`;

function App() {
  return (
    <Router>
      <UserProvider>
        <GlobalStyle />
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </Container>
      </UserProvider>
    </Router>
  );
}

export default App;
