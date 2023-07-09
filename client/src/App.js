import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { styled } from "styled-components";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import HomePage from "./HomePage";
import AddEvent from "./AddEventPage";
import Events from "./AllEventsPage";
import GlobalStyle from "./components/context/GlobalStyle";
import { UserProvider } from "./components/context/UserContext";
import AboutPage from "./AboutPage";

const Container = styled.div`
`;

function App() {
  return (
    <Router>
      <UserProvider>
        <GlobalStyle />
        <NavBar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/addevent" element={<AddEvent />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutPage/>}/>
          </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
