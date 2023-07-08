import { useState, useContext } from "react";
import { styled } from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

import {RxHamburgerMenu} from 'react-icons/rx';
import moment from "moment";

const Container = styled.div`
  z-index: 2001;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 8em;
  background-color: darkseagreen;
  border-bottom: pink 4px solid;
`;
const NavItem = styled.div`
  font-size: 2rem;
  color: white;
  font-weight: bold;
  margin-right: 2em;
  cursor: pointer;
`;
const NavTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 4rem;
  margin: 0.5em 4em 0 1em;
  transition: 200ms;
  cursor: pointer;
  @media screen and (max-width: 700px){
    font-size: 2rem;
  }
`;

const Title = styled.p`
font-family: "Instrument Sans", sans-serif;
`

const NLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  transition: 500ms;
  &:hover {
    color: pink;
  }
`;

const Button = styled.button`
  all:unset;
  cursor:pointer;
  border: white 2px solid;
  padding: 1em 2em ;
  color: white;
  font-weight: bold;
  &:hover{
    background-color: white;
    color: darkseagreen;
  }
`

const HamburgerMenu = styled.div`
display: flex;
flex-direction: row;
@media screen and (max-width: 700px){
    display: none;
  }
`
const HamIcon = styled.div`
@media screen and (min-width: 700px){
    display: none;
  }
`

const NavBar = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleSignout = () => {
    setCurrentUser(null)
    sessionStorage.setItem("users", null)
    navigate("/")
  }

  return (
    <Container>
      
      <NavTitle onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {" "}
        <NLink to="/">
          {hover === false ? (
            <Title>CALEND&apos;ART</Title>
          ) : (
            <Title>{moment().format("DD/MM/YYYY")}</Title>
          )}
        </NLink>
      </NavTitle>
      <HamburgerMenu>
      <NavItem>
        <NLink to="/events">EVENTS</NLink>
      </NavItem>
      {currentUser ? (<NavItem>
        <NLink to="/addevent">ADD EVENT</NLink>
      </NavItem>): (<NavItem>
        <NLink to="/signin">LOG IN</NLink>
      </NavItem>)}
      {currentUser &&
      <Button onClick={handleSignout}>SIGN OUT</Button>}
      </HamburgerMenu>
      <HamIcon><RxHamburgerMenu size={40} color="white"/></HamIcon>
    </Container>
  );
};

export default NavBar;
